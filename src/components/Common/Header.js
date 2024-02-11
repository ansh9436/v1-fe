import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import back from "../../assets/cancel.png";
import "./header.scss";

const Header = (props) => {
    const navigate = useNavigate();

    return (
        <div className="styledHeader">
            <div style={{width: '140px'}}>
                <Link to={props.link}>
                    <img className="logo" src={logo} alt="logo" />
                </Link>
                <span className="headerTitle">{props.title}</span>
            </div>
            {props.backbutton &&
            <div className="backButton">
                <button className="Border" onClick={() => navigate(-1)}>
                    <img className="back" src={back} alt="이전메뉴" />
                </button>
            </div>
            }
        </div>
    );
}

export default Header;
