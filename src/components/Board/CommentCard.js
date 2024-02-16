import React        from "react";
import profile      from "../../assets/profile.png";
import UpdateTime   from "../Common/UpdateTime";
import DeleteButton from "../Board/DeleteButton";
import store        from "../../redux/configStore";
import { jwtUtils }   from "../../utils/jwtUtils";

const CommentCard = ({seq, user_email, user_nick, body, created_at, onRemove}) => {
    const accToken = store.getState().Auth["accToken"];
    const loginUser = jwtUtils.getUser(accToken);

    return (
        <>
            <div className="commentBox" key={seq}>
                <div className="commentUser">
                    <span style={{display: 'flex'}}>
                        <img className="commentUserImg" src={profile} alt="profile" />
                        <p className="commentUserID">{user_nick}</p>
                    </span>
                    { user_email === loginUser["user_email"] &&
                        <DeleteButton seq={seq} onRemove={onRemove} />
                    }
                </div>
                <div className="commentContent">{body}</div>
                <p className="commentTime">
                    <UpdateTime time={created_at}/>
                </p>
            </div>
        </>
    )
}

export default CommentCard;
