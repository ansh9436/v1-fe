import React from "react";
import "./CommentCard.scss";
import moment from "moment";
import api from "../../commons/api";
import { utils } from "../../commons/utils";
import { toast } from "react-toastify";

const CommentCard = ({seq, user_nick, body, created_at, onRemove, writer_yn}) => {
    const onCommentDelete = () => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        confirmDelete && api.delete(`/api/comment`, {data: {seq: seq}})
            .then(res => {
                if (res.data.success) {
                    toast.success(<h3>댓글 삭제에 했습니다.!</h3>, {
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
            <div className="commentBox" key={seq}>
                <div className="commentUser">
                    <span style={{display: 'flex'}}>
                        <img className="commentUserImg" src={'/assets/profile.png'} alt="profile"/>
                        <p className="commentUserID">{user_nick}</p>
                    </span>
                    {writer_yn === 'Y' &&
                    <button style={{color: "#c62912", fontSize: "12px", lineHeight: "22px"}} onClick={onCommentDelete}>
                        삭제
                    </button>
                    }
                </div>
                <div className="commentContent">{body}</div>
                <div className="commentTime">
                    {utils.getUpdateTime(moment(created_at).add(9, 'h'))}
                </div>
            </div>
        </>
    )
}

export default CommentCard;
