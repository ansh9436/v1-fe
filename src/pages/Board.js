import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledBox from "../components/Style/StyledBox";
import Card from "../components/Board/Card";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { Pagination } from "@mui/material";

const Board = () => {
    //const userFrom = localStorage.getItem("userId");
    //const writerFrom = localStorage.getItem("userNickname");
    const [pageTotal, setPageTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [boardList, setBoardList] = useState([]);
    //const [WriterIcon, setWriterIcon] = useState(true);
    //const [BoardWriter, setBoardWriter] = useState("익명");

    /*const [inputs, setInput] = useState({
        boardTitle: "",
        boardContent: "",
    });
    const { boardTitle, boardContent } = inputs;*/

    useEffect(() => {
        const getBoardList = async () => {
            const { data } = await axios.get("/api/board", {params: {page: page}});
            return data;
        };

        getBoardList()
            .then(res => {
                setBoardList(res["resultData"].contents);
                setPageTotal(Number(res["resultData"]["pagination"]["pageTotal"]));
            });
    }, [page]);

    const onRemove = (id) => {
        //setContent(Content.filter((Content) => Content._id !== id));
    };

    /*

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
            setBoardWriter(writerFrom);
        } else {
            setWriterIcon(true);
            setBoardWriter("익명");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!boardTitle) {
            alert(`제목을 작성해주세요`);
            return;
        } else if (!boardContent) {
            alert(`내용을 작성해주세요`);
            return;
        } else if (boardContent.length > 300) {
            alert(`내용을 300자 이내로 작성해주세요`);
            return;
        }
        let variables = {
            userFrom: userFrom,
            boardTitle: boardTitle,
            boardContent: boardContent,
            boardWriter: BoardWriter,
        };
        axios.post("/board/upload", variables).then((response) => {
            if (response.status === 200) {
                setInput({
                    boardTitle: "",
                    boardContent: "",
                });
                FetchBoard();
            } else {
                alert("게시글 업로드에 실패하였습니다.");
            }
        });
    }*/

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
                </div>
                <form className="boardForm" onSubmit={onSubmit}>
                    <BoardInput
                        name="boardTitle"
                        placeholder="제목을 작성해주세요."
                        value={boardTitle}
                        onChange={onChange}
                    />
                    <BoardTextarea
                        name="boardContent"
                        placeholder="여기를 눌러서 글을 작성할 수 있습니다."
                        value={boardContent}
                        onChange={onChange}
                    />
                    <CheckNickname
                        icon={WriterIcon}
                        click={onIconClick}
                        submit={onSubmit}
                    />
                </form>*/}
                {
                boardList.map((board, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card
                                seq={board.seq}
                                createdAt={board.createdAt}
                                user_nick={board.user_nick}
                                title={board.title}
                                body={board.body}
                                onRemove={onRemove}
                            />
                        </React.Fragment>
                    );
                })}
                <div className="paginationBox">
                    <Pagination
                        count={pageTotal}
                        page={page}
                        onChange={(e, value) => {
                            setPage(value);
                        }}
                        shape="rounded"
                        size="small"
                        hidePrevButton
                        hideNextButton
                    />
                </div>
                <Footer/>
            </StyledBox>
        </>
    );
};

export default Board;
