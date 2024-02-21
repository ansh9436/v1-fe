import React, { useState, useEffect } from "react";
import api from "../../commons/api";
import vote from "../../assets/vote.png";

const LikeButton = ({top_seq, user_liked, like_cnt}) => {
    const [likeCount, setLikeCount] = useState(like_cnt);
    const [userLikedStyle, setUserLikedStyle] = useState({});
    const [countStyle, setCountStyle] = useState({});
    const [userLiked, setUserLiked] = useState(user_liked);

    const likeClick = async (e) => {
        e.preventDefault();
        await api.post("/api/like", {top_seq: top_seq, type_is: 'B', like_is: !userLiked})
            .then((res) => {
                const { data } = res;
                console.info('좋아요 result',data);
                if(data.success) {
                    setUserLiked(data["resultData"].user_liked);
                    setLikeCount(data["resultData"].like_cnt);
                }

            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if(userLiked) {
            console.log('좋아요 스타일 변경');
            setUserLikedStyle({width: '12px', height: '12px', marginLeft: '10px'});
        } else {
            console.log('좋아요 해제 스타일 변경');
            setUserLikedStyle({width: '12px', height: '12px', marginLeft: '10px', filter: 'grayScale(100%)'});
        }

        if(likeCount > 0) {
            setCountStyle({ display: 'inline-block', color: '#c62917', fontSize: '13px', paddingLeft: '4px'});
        } else {
            setCountStyle({ display: 'inline-block', color: '#575555', fontSize: '13px', paddingLeft: '4px'});
        }
    },[userLiked]);


    return (
        <>
            <button onClick={likeClick}>
                <img style={userLikedStyle} src={vote} alt="vote" />
                <p style={countStyle}>
                    {likeCount}
                </p>
            </button>
        </>
    );
};

export default LikeButton;
