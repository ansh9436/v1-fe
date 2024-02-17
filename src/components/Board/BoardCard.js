import React         from 'react';
import { Link }      from 'react-router-dom';
import LikeButton    from './LikeButton';
import profile       from '../../assets/profile.png';
import './BoardCard.scss';
import moment        from "moment";
import {toast} from "react-toastify";
import api from "../../utils/api";
import comment from "../../assets/comment.png";
import {utils} from "../../utils/utils";

const BoardCard = ({seq, created_at, writer_yn, user_nick, title,
                       body, user_liked, like_cnt, comment_cnt, onRemove, page}) => {

    const onBoardDelete = () => {
        const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
        confirmDelete && api.delete(`/api/board/${seq}`)
            .then(res => {
                if(res.data.success) {
                    toast.success(<h3>게시글 삭제에 했습니다.!</h3>, {
                        position: "top-center",
                        hideProgressBar: true,
                        autoClose: 2000
                    });
                    onRemove();
                }
            })
            .catch(err => {
                toast.error(err.response.data.message+ "😭", {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000
                });
            })
    }
    return (
        <>
            <div className="boardBox" key={seq}>
                <div className="boardUser">
                    <span style={{display: 'flex'}}>
                        <img className="boardUserImg" src={profile} alt="profile"/>
                        <p className="boardUserID">{user_nick}</p>
                        <div className="boardTime">
                            {utils.getUpdateTime(moment(created_at).add(9, 'h'))}
                            {/*<UpdateTime time={moment(created_at).add(9, 'h')}/>*/}
                        </div>
                    </span>
                    {writer_yn === 'Y' &&
                        <button style={{color: "#c62912",fontSize: "12px",lineHeight: "22px"}} onClick={onBoardDelete}>
                        삭제
                        </button>
                    }
                </div>
                <Link to={`/board/${seq}?page=${page}`}>
                    <div className="boardTitle">{title}</div>
                    <div className="boardContent">{body}</div>
                </Link>
                <div style={{textAlign: "right"}}>
                    <LikeButton
                        top_seq={seq}
                        user_liked={user_liked}
                        like_cnt={like_cnt}
                    />
                    <Link to={`/board/${seq}?page=${page}`}>
                        <button>
                            <img style={{width: '12px', height: '12px', marginLeft: '10px'}}
                                 src={comment} alt="comment" />
                            <p style={{display: 'inline-block', color: '#0ca5af', fontSize: '13px', paddingLeft: '4px'}}>
                                {comment_cnt}
                            </p>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default BoardCard;
