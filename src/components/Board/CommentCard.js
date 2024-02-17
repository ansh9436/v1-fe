import React        from "react";
import profile      from "../../assets/profile.png";
import UpdateTime   from "../Common/UpdateTime";
import DeleteButton from "../Board/DeleteButton";
import "./CommentCard.scss";
import moment from "moment";

const CommentCard = ({seq, user_nick, body, created_at, onRemove, writer_yn}) => {

    return (
        <>
            <div className="commentBox" key={seq}>
                <div className="commentUser">
                    <span style={{display: 'flex'}}>
                        <img className="commentUserImg" src={profile} alt="profile" />
                        <p className="commentUserID">{user_nick}</p>
                    </span>
                    { writer_yn === 'Y' &&
                        <DeleteButton seq={seq} onRemove={onRemove} type={'C'} />
                    }
                </div>
                <div className="commentContent">{body}</div>
                <div className="commentTime">
                    <UpdateTime time={moment(created_at).add(9, 'h')}/>
                </div>
            </div>
        </>
    )
}

export default CommentCard;
