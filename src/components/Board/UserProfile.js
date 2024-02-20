import React from 'react';
import profile from "../../assets/profile.png";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import {utils} from "../../utils/utils";
import "./UserProfile.scss";

const UserProfile = (boardPage) => {
    const accToken = useSelector(state => state.Auth.accToken);

    if (boardPage) {
        const user = utils.getUser(accToken);

        return (
            <div>
                <Link to="/mypage">
                    <img className="profileImage" src= {profile} alt="profile" />
                </Link>
                <div className="nickname">{user["user_nick"]}</div>
                <div className="profileID">{user["user_email"]}</div>
            </div>
        )
    }
}

export default UserProfile;
