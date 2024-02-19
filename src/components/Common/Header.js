import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import backImg from "../../assets/cancel.png";
import profile from "../../assets/profile.png";
import "./Header.scss";

const Header = ({ title, topLink, isBackButton, backLink }) => {
    const navigate = useNavigate();
    const clickLocation = () => {
        backLink ? navigate(backLink) : navigate(-1);
    }

    return (
        <div className="headerStyle">
            <div style={{width: '140px'}}>
                <Link to={topLink}>
                    <img className="logo" src={logoImg} alt="logo" />
                </Link>
                <span className="headerTitle">{title}</span>
            </div>
            {isBackButton
            ?   <div className="headerBackButtonArea">
                    <img className="headerBackButton" src={backImg} alt="이전메뉴" onClick={clickLocation}/>
                </div>
            :
                <div className="headerMyButtonArea">
                    <img className="headerMyButton" src={profile} alt="mypage" onClick={clickLocation}/>
                </div>
            }
        </div>
    );
}

export default Header;
