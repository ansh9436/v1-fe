import React, { useEffect, useState } from 'react';
import {Link, useParams}              from 'react-router-dom';
import api                            from "../utils/api";
import Header from '../components/Common/Header';
import BoardCard from '../components/Board/BoardCard';
import CommentCard from '../components/Board/CommentCard';
import menu from '../assets/menu.png';
import "./board.scss";
import checkWriter from "../assets/writeractive.png";
import uncheckWriter from "../assets/writer.png";

const BoardDetail = () => {
    const { seq } = useParams();
    const [commentList, setCommentList] = useState([]);
    const [boardDetail, setBoardDetail] = useState([]);
    const [body, setBody] = useState("");
    const [isClickIcon, setIsClickIcon] = useState(true); // 클릭시 상태값만 변경
    const [anon_yn, setAnon_yn] = useState('');
    const [commentReload, setCommentReload] = useState(1);

    const onRemoveBoard = (seq) => {
        //setBoardDetail(BoardDetail.filter(BoardDetail => BoardDetail._id !== id))
        //props.history.push("/")
    }
    const onRemoveComment = (seq) => {
        //setComments(Comments.filter(Comments => Comments._id !==id))
    }
    const onChange = (e) => {
        setBody(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        api.post('/api/comment', {top_seq:seq, body:body, anon_yn:anon_yn})
            .then(res => {
                if(res.data.success) {
                    alert("댓글이 등록되었습니다.");
                    setBody("");
                    setCommentReload(enters => enters+1);
                }
            })
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
            .then((res) => {
                if(res.data.success) {
                    setCommentList(res.data["resultData"].contents);
                } else {
                    alert("댓글을 보여줄 수 없습니다.");
                }
            })

        getCommentList()
            .then(res => {
                if(res.data.success) {
                    setBoardDetail([res.data["resultData"]]);
                } else {
                    alert("게시글 가져오기에 실패했습니다.");
                }
            })
        
    }, [commentReload, seq]);

    return (
        <div>
            <Header title="자유게시판" link="/board"/>
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
                            onRemove={onRemoveBoard()}
                        />
                    </React.Fragment>
                )})
            }
            <form className="commentForm" onSubmit={onSubmit}>
                <input className="commentInput"
                    name="Comment"
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
            </form>
            { commentList.map((row, index) => {
                return(
                    <React.Fragment key={index}>
                        <CommentCard
                            seq={row.seq}
                            time={row.createdAt}
                            user_nick={row.user_nick}
                            body={row.body}
                            onRemove={onRemoveComment}
                        />
                    </React.Fragment>
                )})
            }
            <Link to="/board">
                <div className="backButton">
                    <img className="menuIcon" src={menu} alt="menu" />
                    <span className="backTitle">글 목록</span>
                </div>
            </Link>
        </div>
    )
};

export default BoardDetail;
