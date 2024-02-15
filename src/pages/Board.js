import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {Link, useSearchParams} from 'react-router-dom';
import StyledBox from "../components/Style/StyledBox";
import Card from "../components/Board/Card";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Pagination from '@mui/material/Pagination';
import "./board.scss";
import UserProfile from "../components/Board/UserProfile";
import LogoutButton from "../components/Common/LogoutButton";
import {toast, ToastContainer} from "react-toastify";
import checkWriter from "../assets/writeractive.png";
import uncheckWriter from "../assets/writer.png";
import writeIcon from "../assets/write.png";

const Board = () => {
    const [searchParams] = useSearchParams();
    const [pageTotal, setPageTotal] = useState(0);
    const [reloads, setReloads] = useState(1);
    const [page, setPage] = useState(()=>{
        if(searchParams.get("page")) {
            return Number(searchParams.get("page"));
        } else {
            return 1;
        }
    });
    const [boardList, setBoardList] = useState([]);

    const [isAnonymous, setIsAnonymous] = useState(true);
    const [inputs, setInput] = useState({
        title: "",
        body: "",
    });
    const [anon_yn, setAnon_yn] = useState('Y');



    const onRemove = (/*id*/) => {
        //setContent(Content.filter((Content) => Content._id !== id));
    };


    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...inputs,
            [name]: value,
        });
    };

    const onIconClick = () => {
        if(isAnonymous) {
            setIsAnonymous(false);
            setAnon_yn('Y');
        } else {
            setIsAnonymous(true);
            setAnon_yn('N');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputs.title.trim().length === 0) {
            toast.success(<h3>제목을 입력해 주세요!</h3>, {
                position: "top-center",
                autoClose: 2000
            });
            return false;
        } else if (inputs.body.trim().length === 0) {
            toast.success(<h3>내용을 입력해 주세요!</h3>, {
                position: "top-center",
                autoClose: 2000
            });
            return false;
        } else if (inputs.body.trim().length > 300) {
            toast.success(<h3>내용을 300자 이내로 작성해주세요!</h3>, {
                position: "top-center",
                autoClose: 2000
            });
            return;
        }
        api.post("/api/board", {...inputs, anon_yn:anon_yn})
            .then((res) => {
                const { data } = res;
                if (data.success) {
                    setInput({
                        title: "",
                        body: ""
                    });
                    setReloads(enters => enters+1);
                } else {
                    toast.error('게시글 업로드에 실패하였습니다.', {
                        position: "top-center",
                    });
                }
            })
            .catch((e) =>{
                toast.error("오류발생" + e.response.data.message+ "😭", {
                    position: "top-center",
                });
            });
    }

    useEffect(() => {
        const getBoardList = async () => {
            const { data } = await api.get(`/api/board?reloads=${reloads}`, {params: {page: page}});
            return data;
        };

        getBoardList()
            .then(res => {
                setBoardList(res["resultData"].contents);
                setPageTotal(Number(res["resultData"]["pagination"]["pageTotal"]));
            });
    }, [page, reloads])

    return (
        <>
            <Header title="자유게시판" link="/board" />
            <StyledBox backColor="#fafafa" padding="10px 0px" lineHeight="auto">
                <ToastContainer/>
                <div className="profile-box">
                    <UserProfile boardPage={true} />
                    <Link to="/mypage">
                        <div className="Profile-btn">내정보</div>
                    </Link>
                    <div className="profile-btn">
                        <LogoutButton />
                    </div>
                </div>
                <form className="boardForm" onSubmit={onSubmit}>
                    <input
                        name="title"
                        placeholder="제목을 작성해주세요."
                        value={inputs.title}
                        onChange={onChange}
                    />
                    <textarea
                        name="body"
                        placeholder="여기를 눌러서 글을 작성할 수 있습니다."
                        value={inputs.body}
                        onChange={onChange}
                    />
                    <li className="checkButton"  onClick={onIconClick}>
                        {isAnonymous
                            ? <img className="inputIcon" src={checkWriter} alt={checkWriter} />
                            : <img className="inputIcon" src={uncheckWriter} alt={uncheckWriter} />
                        }
                    </li>
                    <li className="submitButton" onClick={onSubmit}>
                        <img className="inputIcon" src={writeIcon} alt={writeIcon} />
                    </li>
                </form>
                {boardList.map((row, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card
                                seq={row.seq}
                                created_at={row.created_at}
                                user_nick={row.user_nick}
                                title={row.title}
                                body={row.body}
                                user_liked={Boolean(row.user_liked)}
                                like_cnt={row.like_cnt}
                                comment_cnt={row.comment_cnt}
                                onRemove={onRemove}
                            />
                        </React.Fragment>
                    );
                })}
                <div className="paginationBox">
                    <Pagination
                        variant="outlined"
                        count={pageTotal}
                        page={page}
                        onChange={(e, value) => {
                            setPage(value);
                        }}
                        size="small"
                        hidePrevButton
                        hideNextButton
                    />
                </div>
                <Footer />
            </StyledBox>
        </>
    );
};

export default Board;
