import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { jwtUtils } from "../../commons/utils";

const Header = ({ title, topLink, isBackButton, backLink }) => {
    const fileHost = process.env.NODE_ENV === 'production' ? '/dothome':process.env.REACT_APP_FILE_HOST;
    let userImg;
    if(jwtUtils.isAuth()) {
        const { user_image } = jwtUtils.getUser();
        userImg = fileHost + '/' + user_image

    }
    const navigate = useNavigate();
    const clickLocation = () => {
        backLink ? navigate(backLink) : navigate(-1);
    }

    return (
        <div className="headerStyle">
            <div style={{width: '140px'}}>
                <Link to={topLink}>
                    <img className="logo" src={'/assets/logo.png'} alt="logo" />
                </Link>
                <span className="headerTitle">{title}</span>
            </div>
            {isBackButton
            ?   <div className="headerBackButtonArea">
                    <img className="headerBackButton" src={'/assets/cancel.png'}
                         alt="이전메뉴" onClick={clickLocation}/>
                </div>
            :
                <div className="headerMyButtonArea">
                    <img className="headerProfileButton" src={userImg}
                         alt="mypage" onClick={clickLocation}/>
                </div>
            }
        </div>
    );
}

export default Header;
