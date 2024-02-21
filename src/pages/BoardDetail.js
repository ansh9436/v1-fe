import React, { useEffect, useState }     from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import api                                from "../commons/api";
import Header                         from '../components/Common/Header';
import BoardCard                      from '../components/Board/BoardCard';
import CommentCard                    from '../components/Board/CommentCard';
import menu                           from '../assets/menu.png';
import "./Board.scss";
import checkWriter                    from "../assets/writeractive.png";
import uncheckWriter                  from "../assets/writer.png";
import writeIcon                      from "../assets/write.png";
import { toast, ToastContainer } from "react-toastify";

const BoardDetail = () => {
    const { seq } = useParams();
    const [searchParams] = useSearchParams();
    const [page] = useState(()=>{
        if(searchParams.get("page")) {
            return Number(searchParams.get("page"));
        } else {
            return 1;
        }
    });
    const [commentList, setCommentList] = useState([]);
    const [boardDetail, setBoardDetail] = useState([]);
    const [body, setBody] = useState("");
    const [isClickIcon, setIsClickIcon] = useState(true); // 클릭시 상태값만 변경
    const [anon_yn, setAnon_yn] = useState('Y');
    const [commentReload, setCommentReload] = useState(1);

    const onRemoveBoard = () => {
        // 리스트로 리다이렉션
    }
    const onRemoveComment = () => {
        setCommentReload(enters => enters+1);
    }
    const onChange = (e) => {
        setBody(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (body.trim().length === 0 || body.trim().length > 100) {
            toast(<h3>100자 이내로 작성해주세요!</h3>, {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 2000
            });
            return false;
        }
        api.post('/api/comment', {top_seq:seq, body:body, anon_yn:anon_yn})
            .then(res => {
                if(res.data.success) {
                    toast.success(<h3>댓글 작성이 완료 되었습니다.</h3>, {
                        position: "top-center",
                        hideProgressBar: true,
                        autoClose: 2000
                    });
                    setBody("");
                    setCommentReload(enters => enters+1);
                }
            })
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
        const getCommentList = async () => {
            const { data } = await api.get(`/api/comment?commentReload=${commentReload}`,
                                            {params: {top_seq: seq}});
            return data;
        }
        const getBoardDetail = async () => {
            const { data } = await api.post(`/api/board/${seq}`);
            return data;
        }

        getBoardDetail()
            .then((data) => {
                if(data.success) {
                    setBoardDetail([data["resultData"]]);
                }
            }).catch(err => {
                console.log(err);
            });

        getCommentList()
            .then(data => {
                if(data.success) {
                    setCommentList(data["resultData"].contents);
                }
            }).catch(err => {
                console.log(err);
            });

    }, [commentReload, seq]);

    return (
        <div>
            <Header title="자유게시판" topLink="/board" isBackButton={true}  />
            <ToastContainer/>
            { boardDetail.map((row, index) => {
                return(
                    <React.Fragment key={index}>
                        <BoardCard
                            seq={row.seq}
                            created_at={row["created_at"]}
                            user_email={row.user_email}
                            user_nick={row.user_nick}
                            title={row.title}
                            body={row.body}
                            user_liked={Boolean(row.user_liked)}
                            like_cnt={row.like_cnt}
                            comment_cnt={row.comment_cnt}
                            writer_yn={row.writer_yn}
                            onRemove={onRemoveBoard}
                        />
                    </React.Fragment>
                )})
            }
            <form className="commentForm" onSubmit={onSubmit}>
                <input className="commentInput"
                    name="body"
                    placeholder="댓글을 작성해주세요."
                    value={body}
                    onChange={onChange}
                />
                <li className="checkButton" style={{left: '284px'}}>
                    {isClickIcon
                        ? <img className="inputIcon" src={checkWriter}
                               alt='checkImg' onClick={onIconClick} />
                        : <img className="inputIcon" src={uncheckWriter}
                               alt='unCheckImg' onClick={onIconClick} />
                    }
                </li>
                <li className="submitButtonDetail" onClick={onSubmit}>
                    <img className="inputIcon" src={writeIcon} alt={writeIcon} />
                </li>
            </form>
            { commentList.map((row, index) => {
                return(
                    <React.Fragment key={index}>
                        <CommentCard
                            seq={row.seq}
                            time={row.createdAt}
                            user_nick={row.user_nick}
                            body={row.body}
                            created_at={row.created_at}
                            onRemove={onRemoveComment}
                            writer_yn={row.writer_yn}
                        />
                    </React.Fragment>
                )})
            }
            <Link to={`/board?page=${page}`}>
                <div className="backButton">
                    <img className="menuIcon" src={menu} alt="menu" />
                    <span className="backTitle">글 목록</span>
                </div>
            </Link>
        </div>
    )
};

export default BoardDetail;
