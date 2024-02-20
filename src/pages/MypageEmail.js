import React, {useState} from 'react';
import api               from '../utils/api';
import { utils }     from '../utils/utils';
import Header        from '../components/Common/Header';
import Footer        from '../components/Common/Footer';
import StyledBox     from '../components/Style/StyledBox';
import MyPageTitle   from '../components/Style/MyPageTitle';
import MyPageInput   from '../components/Style/MyPageInput';
import MyPageButton  from '../components/Style/MyPageButton';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Formik} from "formik";
import * as Yup from "yup";
import {setAccToken, setReToken} from "../redux/reducers/AuthReducer";


const MypageEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accToken = useSelector(state => state.Auth.accToken);
    const { user_email } = utils.getUser(accToken);

    const textBox = {
        marginTop: '12px'
    };
    const emailAlert = {
        color: '#999',
        fontSize: '12px',
        lineHeight: '18px',
        marginTop: '8px'
    };
    const emailWarning = {
        color: '#c62917',
        fontSize: '12px',
        lineHeight: '18px',
        marginTop: '8px'
    };
    const errorMessage = {
        padding: '7px 10px',
        fontSize: '0.7rem',
        color: 'red',
        fontWeight: 'bold'
    };

    const validationSchema = Yup.object().shape({
        user_passwd: Yup.string()
            .required("비밀번호를 입력하세요!"),
        change_email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다!")
            .required("이메일을 입력하세요!"),
    });

    const onSubmitEmail = async(values) => {
        const { user_passwd, change_nick } = values;
        try {
            await api.put("/api/mypage", {
                user_passwd: user_passwd,
                change_nick: change_nick,
                type: 'nick'
            })
                .then(res => {
                    if(res.data.success) {
                        dispatch(setAccToken(""));
                        dispatch(setReToken(""));
                        toast.success(<h3>닉네임 변경 완료되었습니다.<br/>다시 로그인 하세요😎</h3>, {
                            position: "top-center",
                            autoClose: 2000
                        });
                        setTimeout(()=> {
                            navigate("/login");
                        }, 2000);
                    } else {
                        toast.error(res.data.message + "😭", {
                            position: "top-center",
                        });
                    }
                });
        } catch(e) {
            toast.error(e.response.data.message + "😭", {
                position: "top-center",
            });
        }
    }

    return (
        <>
            <Header title="이메일 변경" topLink={"/mypage"} isBackButton={true} />
            <Formik
                initialValues={{
                    change_email: "",
                    user_passwd: ""
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmitEmail}
            >
                {({values, handleSubmit, handleChange, errors}) => (
                    <StyledBox>
                        <ToastContainer/>
                        <form onSubmit={handleSubmit}>
                        <MyPageTitle>기존의 이메일은 '{user_email}' 입니다. <br /> 새로운 이메일 변경하세요</MyPageTitle>
                        <MyPageInput
                            name="change_email"
                            placeholder="변경할 이메일"
                            value={values.change_email}
                            onChange={handleChange}
                        />
                        <div style={errorMessage}>
                            {errors.change_email}
                        </div>
                        <MyPageTitle>계정 비밀번호</MyPageTitle>
                        <MyPageInput
                            type="password"
                            name="user_passwd"
                            placeholder="계정 비밀번호"
                            value={values.user_passwd}
                            onChange={handleChange}
                        />
                        <div style={errorMessage}>
                            {errors.user_passwd}
                        </div>
                        <div style={textBox}>
                            <p style={emailWarning}>※ 반드시 본인의 이메일을 입력해주세요.</p>
                            <strong style={emailAlert}>
                                ※ 계정 분실 시 아이디/비밀번호 찾기, 개인정보 관련 주요 고지사항 안내 등에 사용됩니다.
                            </strong>
                        </div>
                        <MyPageButton margin="20px 0 20px 0">이메일 변경</MyPageButton>
                        </form>
                    </StyledBox>
                )}
            </Formik>
            <Footer/>
        </>
    );
}

export default MypageEmail
