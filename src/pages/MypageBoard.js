import React, { useEffect, useState }     from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import api                                from "../utils/api";
import Header from '../components/Common/Header';
import AddBoard from '../components/Board/BoardCard';
import StyledBox from '../components/Style/StyledBox';

const MypageBoard = () => {
    const boardWarning = {
        color: '#c62917',
        fontSize: '15px',
        lineHeight: '18px',
        fontWeight: 'normal',
        textAlign: 'center',
        padding: '50px 0'
    };

    const { myBoardAct } = useParams();
    const [searchParams] = useSearchParams();
    const [page] = useState(()=>{
        if(searchParams.get("page")) {
            return Number(searchParams.get("page"));
        } else {
            return 1;
        }
    });
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        api.get('/api/mypage/board', {params: {myBoardAct: myBoardAct, page: page}})
            .then(res => {
                if(res.data.success) {
                    setBoardList(res.data["resultData"].contents);
                } else {
                    alert("게시글 정보를 가져오는데 실패했습니다.")
                }
            })
    }, [])

    const onRemove = () => {

    }

    return (
        <>
            <Header title="내가 쓴 글" topLink="/mypage/board" isBackButton={true} />
            {(boardList.length === 0) &&
            <StyledBox>
                <p style={boardWarning}>게시글 목록이 없습니다.</p>
            </StyledBox>
            }
            {
                boardList.map((board, index) => {
                return(
                    <React.Fragment key={index}>
                        <Link to={`../board/${board._id}`}>
                            <AddBoard
                                id={board._id}
                                user={board.userFrom}
                                time={board.createdAt}
                                writer={board.boardWriter}
                                title={board.boardTitle}
                                content={board.boardContent}
                                onRemove={onRemove}
                            />
                        </Link>
                    </React.Fragment>
                )})
            }
        </>
    )
};

export default MypageBoard;
