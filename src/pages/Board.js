import React, { useEffect, useState } from "react";
import api from "../utils/api";
import StyledBox from "../components/Style/StyledBox";
import Card from "../components/Board/Card";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Pagination from '@mui/material/Pagination';
import "./board.scss";
import CheckNickname from "../components/Board/CheckNickname";

const Board = () => {
    //const userFrom = localStorage.getItem("userId");
    //const writerFrom = '임시';//localStorage.getItem("userNickname");
    const [pageTotal, setPageTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [WriterIcon, setWriterIcon] = useState(true);
    const [BoardWriter, setBoardWriter] = useState("익명");

    const [inputs, setInput] = useState({
        title: "",
        body: "",
    });

    useEffect(() => {
        const getBoardList = async () => {
            const { data } = await api.get("/api/board", {params: {page: page}});
            return data;
        };

        getBoardList()
            .then(res => {
                setBoardList(res["resultData"].contents);
                setPageTotal(Number(res["resultData"]["pagination"]["pageTotal"]));
            });
    }, [page]);

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
        if (WriterIcon) {
            setWriterIcon(false);
            setBoardWriter("N");
        } else { //익명
            setWriterIcon(true);
            setBoardWriter("Y");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!inputs.title) {
            alert(`제목을 작성해주세요`);
            return;
        } else if (!inputs.body) {
            alert(`내용을 작성해주세요`);
            return;
        } else if (inputs.body.length > 300) {
            alert(`내용을 300자 이내로 작성해주세요`);
            return;
        }
        const params = {
            title: inputs.title,
            body: inputs.body
        };
        api.post("/api/board", params).then((res) => {
            if (res.status === 200) {
                setInput({
                    title: "",
                    body: "",
                    anon_yn: BoardWriter
                });
                setPage(0);
            } else {
                alert("게시글 업로드에 실패하였습니다.");
            }
        });
    }

    return (
        <>
            <Header title="자유게시판" link="/board" />
            <StyledBox backColor="#fafafa" padding="10px 0px" lineHeight="auto">
                {/*<div className="profile-box">
                    <UserProfile boardPage={true} />
                    <Link to="/mypage">
                        <div className="Profile-btn">내정보</div>
                    </Link>
                    <div className="profile-btn">
                        <LogoutButton />
                    </div>
                </div>*/}
                <form className="boardForm" onSubmit={onSubmit}>
                    <input
                        name="title"
                        placeholder="제목을 작성해주세요."
                        value={inputs.title}
                        onChange={onChange}
                    />
                    <textarea
                        name="boardContent"
                        placeholder="여기를 눌러서 글을 작성할 수 있습니다."
                        value={inputs.body}
                        onChange={onChange}
                    />
                    <CheckNickname
                        icon={WriterIcon}
                        click={onIconClick}
                        submit={onSubmit}
                    />
                </form>
                {
                boardList.map((row, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card
                                seq={row.seq}
                                created_at={row.created_at}
                                user_nick={row.user_nick}
                                title={row.title}
                                body={row.body}
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
