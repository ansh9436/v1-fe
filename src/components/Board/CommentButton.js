import React from 'react';
import comment from '../../assets/comment.png';

const CommentButton = ({comment_cnt}) => {
    return (
        <button>
            <img style={{width: '12px', height: '12px', marginLeft: '10px'}}
                 src={comment} alt="comment" />
            <p style={{display: 'inline-block', color: '#0ca5af', fontSize: '13px', paddingLeft: '4px'}}>
                {comment_cnt}
            </p>
        </button>
    )
};

export default CommentButton;
