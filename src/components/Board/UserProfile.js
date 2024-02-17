import React from 'react';
import styled from 'styled-components';
import profile from "../../assets/profile.png";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import {utils} from "../../utils/utils";


const ProfileImage = styled["img"]`
  width: 76px;
  height: 76px;
  margin: 24px 0px 4px 0px;
  border-radius: 6px;
  pointer: cursor;
`
const Nickname = styled["div"]`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`
const ProfileID = styled["div"]`
  color: #999;
  font-size: 13px;
  line-height: 20px;
`

const UserProfile = (boardPage) => {
    const accToken = useSelector(state => state.Auth.accToken);

    if (boardPage) {
        const user = utils.getUser(accToken);

        return (
            <div>
                <Link to="/mypage">
                    <ProfileImage src= {profile} alt="profile" />
                </Link>
                <Nickname>{user["user_nick"]}</Nickname>
                <ProfileID>{user["user_email"]}</ProfileID>
            </div>
        )
    }
}

export default UserProfile;
