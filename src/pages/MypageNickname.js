import React from 'react';
import api from '../commons/api';
import { jwtUtils } from '../commons/utils';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import StyledBox from '../components/Style/StyledBox';
import MyPageTitle from '../components/Style/MyPageTitle';
import MyPageInput from '../components/Style/MyPageInput';
import MyPageButton from '../components/Style/MyPageButton';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

const MypageNickname = () => {
    let { user_nick } = jwtUtils.getUser();

    const nickAlert = {
        color: '#757575',
        fontSize: '12px',
        fontWeight: 'normal'
    };
    const nickWarning = {
        color: '#c62917',
        marginLeft: '4px',
        fontWeight: 'normal'
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
        change_nick: Yup.string()
            .min(2, "닉네임은 최소 2글자 이상입니다!")
            .max(10, "닉네임은 최대 10글자입니다!")
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
                "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
            )
            .required("닉네임을 입력하세요!"),
    });

    const onSubmitNick = async (values) => {
        const { user_passwd, change_nick } = values;

            await api.put("/api/mypage", {
                                user_passwd: user_passwd,
                                change_nick: change_nick,
                                type: 'nick'
            })
            .then(async res => {
                if (res.data.success) {
                    toast.success(<h3>닉네임 변경 완료되었습니다.😎</h3>, {
                        position: "top-center",
                        autoClose: 2000
                    });
                    values.change_nick = '';
                    values.user_passwd = '';
                    user_nick = change_nick;
                    return await jwtUtils.tokenPublish();
                } else {
                    if (res.data.message === 'MypagePasswordNotCompare') {
                        toast.error(<h3>비밀번호가 일치하지 않습니다.</h3>, {
                            position: "top-center",
                        });
                    } else {
                        console.error(res.data.message);
                        toast.error(<h3>닉네임 변경 중 에러가 발생했습니다.<br/>다시 시도 하세요</h3>, {
                            position: "top-center",
                        });
                    }
                }
            })
            .catch((e) =>{
                console.error(e.response.data.message);
                toast.error(<h3>닉네임 변경 중 에러가 발생했습니다.</h3>, {
                    position: "top-center",
                });
            });
    }

    return (
        <>
            <Header title="닉네임 변경" topLink={"/mypage"} isBackButton={true} />
            <Formik
                initialValues={{
                    change_nick: "",
                    user_passwd: ""
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmitNick}
            >
                {({values, handleSubmit, handleChange, errors}) => (
                    <StyledBox lineHeight="40px">
                        <ToastContainer/>
                        <form onSubmit={handleSubmit}>
                            <MyPageTitle>기존의 닉네임은 <><font color='blue'>{user_nick}</font></> 입니다.</MyPageTitle>
                            <MyPageInput
                                type='text'
                                placeholder="변경할 닉네임"
                                name="change_nick"
                                onChange={handleChange}
                                value={values.change_nick}
                            />
                            <div style={errorMessage}>
                                {errors.change_nick}
                            </div>
                            <MyPageTitle>계정 비밀번호</MyPageTitle>
                            <MyPageInput
                                type="password"
                                name="user_passwd"
                                placeholder="계정 비밀번호"
                                onChange={handleChange}
                                value={values.user_passwd}
                                autoComplete='new-password'
                            />
                            <div style={errorMessage}>
                                {errors.user_passwd}
                            </div>
                            <p style={nickAlert}>※ 닉네임을 설정하면
                                <strong style={nickWarning}>30일간 변경 할 수 없습니다.</strong>
                            </p>
                            <MyPageButton margin="10px 0px 20px 0px">닉네임 변경</MyPageButton>
                        </form>
                    </StyledBox>
                )}
            </Formik>
            <Footer/>
        </>
    );
}

export default MypageNickname;
