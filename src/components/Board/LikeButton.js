import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import vote from "../../assets/vote.png";


const LikeButton = ({top_seq, user_liked, like_cnt}) => {
    const [reload, setReload] = useState(false);
    const [likeCounts, setLikeCounts] = useState(like_cnt);
    const [userLiked, setUserLiked] = useState(user_liked);

    const ifUserHasLiked = () => {

    };

    const likeClick = async (e) => {
        e.preventDefault();
        await api.post("/api/like", variables)
            .then((response) => {
                if (!response.data.success) {
                    alert("좋아요 정보를 가져오는데 실패했습니다.");
                    return;
                }
                let responsedData = response.data.liked;
                setUserLiked(responsedData);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {

    },[]);

    return (
        <>
            <button onClick={likeClick}>
                <img style={{width: '12px', height: '12px', marginLeft: '10px'}}
                     src={vote} alt="vote" />
                <p style={{ display: 'inline-block', color: '#c62917',
                    fontSize: '13px', paddingLeft: '4px'}}>
                    {likeCounts}
                </p>
            </button>
        </>
    );
};

export default LikeButton;
