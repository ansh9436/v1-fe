import React from 'react';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import './BoardCard.scss';
import moment from "moment";
import {toast} from "react-toastify";
import api from "../../commons/api";
import {utils} from "../../commons/utils";

const BoardCard = ({
                       seq, created_at, writer_yn, user_nick, title,
                       body, user_liked, like_cnt, comment_cnt, onRemove, page, user_image
                   }) => {
    const proxy = process.env.NODE_ENV === 'production' ? '/proxy':process.env.APP_API_URL;
    const userImage = proxy + '/' + user_image;

    const onBoardDelete = () => {
        const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
        confirmDelete && api.delete(`/api/board/${seq}`)
            .then(res => {
                if (res.data.success) {
                    toast.success(<h3>게시글 삭제에 했습니다.!</h3>, {
                        position: "top-center",
                        hideProgressBar: true,
                        autoClose: 2000
                    });
                    onRemove();
                }
            })
            .catch(err => {
                toast.error(err.response.data.message + "😭", {
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
                        <img className="boardUserImg" src={userImage} alt="profile"/>
                        <p className="boardUserID">{user_nick}</p>
                        <div className="boardTime">
                            {utils.getUpdateTime(moment(created_at).add(9, 'h'))}
                        </div>
                    </span>
                    {writer_yn === 'Y' &&
                    <button style={{color: "#c62912", fontSize: "12px", lineHeight: "22px"}}
                            onClick={onBoardDelete}>
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
                                 src={'/assets/comment.png'} alt="comment"/>
                            <p style={{
                                display: 'inline-block',
                                color: '#0ca5af',
                                fontSize: '13px',
                                paddingLeft: '4px'
                            }}>
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
