import React         from 'react';
import { Link }      from 'react-router-dom';
import LikeButton    from './LikeButton';
import CommentButton from './CommentButton';
import UpdateTime    from '../Common/UpdateTime';
import profile       from '../../assets/profile.png';
import DeleteButton  from '../Board/DeleteButton';
import './BoardCard.scss';
import moment        from "moment";

const BoardCard = ({seq, created_at, writer_yn, user_nick, title,
                       body, user_liked, like_cnt, comment_cnt, onRemove, page}) => {
    return (
        <>
            <div className="boardBox" key={seq}>
                <div className="boardUser">
                    <span style={{display: 'flex'}}>
                        <img className="boardUserImg" src={profile} alt="profile"/>
                        <p className="boardUserID">{user_nick}</p>
                        <div className="boardTime">
                            <UpdateTime time={moment(created_at).add(9, 'h')}/>
                        </div>
                    </span>
                    {writer_yn === 'Y' &&
                        <DeleteButton board={seq} onRemove={onRemove} type={'B'} />
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
                        <CommentButton comment_cnt={comment_cnt}/>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default BoardCard;
