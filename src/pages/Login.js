import React, { useState } from "react";
//import { useDispatch } from "react-redux";
//import { loginUser } from "../_actions/user_actions";
import { Link } from "react-router-dom";
import './login.scss';
import logo from "../assets/logo.png";

//const Login = ({history }) => {
const Login = () => {
    //const dispatch = useDispatch();
    const [inputs, setInput] = useState({
        userId: "",
        userPw: "",
    });

    const { userId, userPw } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...inputs,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        /*let body = {
            id: userId,
            password: userPw,
        };*/
        if (!userId || !userPw) {
            alert("필수 항목을 작성하세요!");
        } else {
            /*dispatch(loginUser(body))
                .then((response) => {
                    if (response.payload.loginSuccess) {
                        window.localStorage.setItem('userId', response.payload.userId);
                        history.push("/board");
                    } else {
                        alert(response.payload.message);
                    }
                }
            )*/
        }
    };

    return (
        <div className='styledContainer'>
            <div>
                <div className='flexBox'>
                    <img className='logo' src={logo} alt="logo" />
                    <h2 className='logoTitle'>지금
                        <strong> 에브리타임</strong>
                        을 시작하세요!
                    </h2>
                </div>
                <form onSubmit={onSubmit}>
                    <input className='styledInput'
                        type="text"
                        name="userId"
                        placeholder="아이디"
                        onChange={onChange}
                        value={userId}
                    />
                    <input className='styledInput'
                        type="password"
                        name="userPw"
                        placeholder="비밀번호"
                        onChange={onChange}
                        value={userPw}
                    />
                    <button className='styledButton' type="submit">로그인</button>
                </form>
                <div className='styledDiv'>
                    <Link to="./register">
                        <span className='styledSpan'>에브리타임에 처음이신가요?</span>회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
