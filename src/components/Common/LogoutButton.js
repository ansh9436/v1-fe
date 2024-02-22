import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccToken } from "../../redux/reducers/AuthReducer";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(setAccToken(""));
        alert("로그아웃 되었습니다😎");
        navigate("/");
    };

    return (
        <>
            <button onClick={handleLogout} style={{color: 'inherit', fontSize: 'inherit'}}>로그아웃</button>
        </>
    );
}

export default LogoutButton;
