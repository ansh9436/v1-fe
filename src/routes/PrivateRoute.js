import React from "react";
import { Navigate } from "react-router-dom";
import { utils } from "../utils/utils";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
    // 넘어오는 props 를 파악하는게 중요.
    // path, component ....
    //const token = useSelector((state) => state.Auth.token);
    const token = useSelector((state) => {
        console.log('stateAuth', state.Auth);
        return state.Auth.accToken;
    });
    const {component: RouteComponent, path} = props;
    // redirectUrl 은 로그인이 성공후 돌아갈 화면이다.
    if (!utils.isAuth(token)) {
        alert("로그인이 필요한 페이지입니다");
        return <Navigate to={`/login?redirectUrl=${path}`}/>;
    }
    return <RouteComponent/>;
};

export default PrivateRoute;
