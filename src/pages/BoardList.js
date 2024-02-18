import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link, useSearchParams } from "react-router-dom";
import StyledBox from "../components/Style/StyledBox";
import BoardCard from "../components/Board/BoardCard";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Pagination from "@mui/material/Pagination";
import "./Board.scss";
import UserProfile from "../components/Board/UserProfile";
import LogoutButton from "../components/Common/LogoutButton";
import { toast, ToastContainer } from "react-toastify";
import checkWriter from "../assets/writeractive.png";
import uncheckWriter from "../assets/writer.png";
import writeIcon from "../assets/write.png";

const BoardList = () => {
    const [searchParams] = useSearchParams();
    const [pageTotal, setPageTotal] = useState(0);
    const [reload, setReload] = useState(1);
    const [page, setPage] = useState(()=>{
        if(searchParams.get("page")) {
            return Number(searchParams.get("page"));
        } else {
            return 1;
        }
    });
    const [boardList, setBoardList] = useState([]);
    const [isClickIcon, setIsClickIcon] = useState(true); // 클릭시 상태값만 변경
    const [inputs, setInput] = useState({
        title: "",
        body: "",
    });
    const [anon_yn, setAnon_yn] = useState('Y');



    const onRemove = () => {
        setReload(enters => enters+1);
    }


    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...inputs,
            [name]: value,
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputs.title.trim().length === 0) {
            toast(<h3>제목을 입력해 주세요!</h3>, {
                hideProgressBar: true,
                position: "top-center",
                autoClose: 2000
            });
            return false;
        } else if (inputs.body.trim().length === 0) {
            toast(<h3>내용을 입력해 주세요!</h3>, {
                hideProgressBar: true,
                position: "top-center",
                autoClose: 2000
            });
            return false;
        } else if (inputs.body.trim().length > 300) {
            toast(<h3>내용을 300자 이내로 작성해주세요!</h3>, {
                hideProgressBar: true,
                position: "top-center",
                autoClose: 2000
            });
            return false;
        }
        api.post("/api/board", {anon_yn:anon_yn, ...inputs})
            .then((res) => {
                const { data } = res;
                if (data.success) {
                    setInput({
                        title: "",
                        body: ""
                    });
                    if(page > 1) {
                        setPage(1);
                    } else {
                        setReload(enters => enters+1);
                    }
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
        return true;
    }

    // 클릭시 모드가 변경됨에 유의
    const onIconClick = (ev) => {
        const { alt } = ev.target;
        if(alt === 'checkImg') {
            setAnon_yn('N');
            console.log('실명', alt, anon_yn);
        } else {
            setAnon_yn('Y');
            console.log('익명', alt, anon_yn);
        }
        setIsClickIcon(() => {
            return !isClickIcon;    // 값만 반전시켜 체크 언체크로 바꿈
        });
    }

    useEffect(() => {
        const getBoardList = async () => {
            const { data } = await api.get(`/api/board?reload=${reload}`, {params: {page: page}});
            return data;
        };

        getBoardList()
            .then(res => {
                setBoardList(res["resultData"].contents);
                setPageTotal(Number(res["resultData"]["pagination"]["pageTotal"]));
            }).catch(err => {
                console.log(err);
            });
    }, [page, reload])

    return (
        <>
            <Header title="자유게시판" topLink="/board" />
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
                    <li className="checkButton">
                        {isClickIcon
                            ? <img className="inputIcon" src={checkWriter}
                                   alt='checkImg' onClick={onIconClick} />
                            : <img className="inputIcon" src={uncheckWriter}
                                   alt='unCheckImg' onClick={onIconClick} />
                        }
                    </li>
                    <li className="submitButtonList" onClick={onSubmit}>
                        <img className="inputIcon" src={writeIcon} alt={writeIcon} />
                    </li>
                </form>
                {boardList.map((row, index) => {
                    return (
                        <React.Fragment key={index}>
                            <BoardCard
                                seq={row.seq}
                                created_at={row["created_at"]}
                                writer_yn={row["writer_yn"]}
                                user_nick={row.user_nick}
                                title={row.title}
                                body={row.body}
                                user_liked={Boolean(row.user_liked)}
                                like_cnt={row.like_cnt}
                                comment_cnt={row.comment_cnt}
                                onRemove={onRemove}
                                page={page}
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

export default BoardList;
