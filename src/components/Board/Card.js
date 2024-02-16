import React from 'react';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import UpdateTime from '../Common/UpdateTime';
import profile from '../../assets/profile.png';
import DeleteButton from '../Board/DeleteButton';
import './card.scss';
import store from "../../redux/configStore";
import {jwtUtils} from "../../utils/jwtUtils";

const Card = ({seq, created_at, user_email, user_nick, title, body, user_liked, like_cnt, comment_cnt, onRemove}) => {
    const accToken = store.getState().Auth["accToken"];
    const user = jwtUtils.getUser(accToken);
    return (
        <>
            <div className="boardBox" key={seq}>
                <div className="BoardUser">
                    <span style={{display: 'flex'}}>
                        <img className="boardUserImg" src={profile} alt="profile"/>
                        <p className="boardUserID">{user_nick}</p>
                        <div className="boardTime">
                            <UpdateTime time={created_at}/>
                        </div>
                    </span>
                    {user_email === user["user_email"] &&
                        <DeleteButton board={seq} onRemove={onRemove} />
                    }
                </div>
                <Link to={`/board/${seq}`}>
                    <div className="boardTitle">{title}</div>
                    <div className="boardContent">{body}</div>
                </Link>
                <div style={{textAlign: "right"}}>
                    <LikeButton
                        top_seq={seq}
                        user_liked={user_liked}
                        like_cnt={like_cnt}
                    />
                    <Link to={`/board/${seq}`}>
                        <CommentButton comment_cnt={comment_cnt}/>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default Card;
