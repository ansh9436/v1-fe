import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from "../commons/api";
import Header from '../components/Common/Header';
import StyledBox from '../components/Style/StyledBox';
import BoardCard from "../components/Board/BoardCard";
import Pagination from "@mui/material/Pagination";
import Footer from "../components/Common/Footer";

const MypageBoard = () => {
    const boardWarning = {
        color: '#c62917',
        fontSize: '15px',
        lineHeight: '18px',
        fontWeight: 'normal',
        textAlign: 'center',
        padding: '50px 0',
        display: 'none'
    };

    const paginationBox = {
        textAlign: 'center',
        marginTop: '1em',
        marginBottom: '1em',
        display: 'flex',
        justifyContent: 'center'
    };
    const titles = {board: '내가 쓴 글', comment: '내가 댓글 단 글', like: '내가 좋아한 글'};
    const {type} = useParams();
    const title = titles[type];
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(() => {
        if (searchParams.get("page")) {
            return Number(searchParams.get("page"));
        } else {
            return 1;
        }
    });
    const [pageTotal, setPageTotal] = useState(0);
    const [reload, setReload] = useState(1);
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        const getBoardList = async () => {
            const {data} = await api.get(`/api/mypage/posted?reload=${reload}`,
                {params: {type: type, page: page}});
            return data;
        };

        getBoardList()
            .then(data => {
                if (data.success) {
                    setBoardList(data["resultData"].contents);
                    setPageTotal(Number(data["resultData"]["pagination"]["pageTotal"]));
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
            console.error(err.response.data);
        });
    }, [type, page, reload])

    const onRemove = () => {
        setReload(enters => enters + 1);
    }

    return (
        <>
            <Header title={title} topLink="/mypage/board" isBackButton={true}/>
            {(boardList.length === 0) &&
            <StyledBox>
                <p style={boardWarning}>게시글 목록이 없습니다.</p>
            </StyledBox>
            }
            {
                boardList.map((row, index) => {
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
                                user_image={row.user_image}
                                onRemove={onRemove}
                                page={page}
                            />
                        </React.Fragment>
                    )
                })
            }
            <div style={paginationBox}>
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
            <Footer/>
        </>
    )
};

export default MypageBoard;
