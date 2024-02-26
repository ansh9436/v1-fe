import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtUtils } from "../../commons/utils";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        jwtUtils.setAccToken('');
        jwtUtils.setReToken('');
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
