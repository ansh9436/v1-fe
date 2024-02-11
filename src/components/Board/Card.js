import React from 'react';
import { Link } from 'react-router-dom';
//import LikeButton from './LikeButton';
//import CommentButton from './CommentButton';
import UpdateTime from '../Common/UpdateTime';
import profile from '../../assets/profile.png';
import DeleteButton from '../Board/DeleteButton';
import "./card.scss";

const Card = ({seq, created_at, user_nick, title, body, onRemove}) => {
    //const currentUser = window.localStorage.getItem('userId');
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
                    <DeleteButton
                        board={seq}
                        onRemove={onRemove}
                    />
                </div>
                <Link to={`/board/${seq}`}>
                    <div className="boardTitle">{title}</div>
                    <div className="boardContent">{body}</div>
                </Link>
                <div style={{textAlign: "right"}}>
                    {/*<LikeButton
                        boardId={seq}
                        boardWriter={props.writer}
                        boardTitle={props.title}
                        boardContent={props.content}
                    />
                    <Link to={`/board/${seq}`}>
                        <CommentButton boardId={seq}/>
                    </Link>*/}
                </div>
            </div>
        </>
    )
};

export default Card;
