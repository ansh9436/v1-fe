import React, { useState } from 'react';
import api from '../utils/api';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import StyledBox from '../components/Style/StyledBox';
import MyPageTitle from '../components/Style/MyPageTitle';
import MyPageInput from '../components/Style/MyPageInput';
import MyPageButton from '../components/Style/MyPageButton';
import * as Yup from "yup";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const MypagePasswd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const titleBox = {
        display: 'flex',
        justifyContent: 'space-between'
    };
    const subtitle = {
        color: '#ccc',
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '24px',
        paddingRight: '4px',
        marginTop: '10px'
    }
    const passwdWarning = {
        color: '#c62917',
        marginLeft: '4px',
        fontWeight: 'normal'
    };
    const passwdAlert = {
        color: '#999',
        fontsize: '12px',
        lineHeight: '18px',
        marginTop: '20px'
    };
    const errorMessage = {
        padding: '7px 10px',
        fontSize: '0.7rem',
        color: 'red',
        fontWeight: 'bold'
    };

    const validationSchema = Yup.object().shape({
        change_passwd: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다")
            .max(16, "비밀번호는 최대 16자리입니다!")
            .required("비밀번호를 입력하세요!")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
            ),
        change_passwd2: Yup.string()
            .oneOf([Yup.ref("change_passwd"), null], "비밀번호가 일치하지 않습니다!")
            .required("비밀번호 확인을 입력하세요!"),
        user_passwd: Yup.string()
            .required("비밀번호를 입력하세요!"),
    })

    const onSubmitPasswd = async(values) => {
            await api.post('/user/update/password', body)
                .then((response) => {
                    if(!response.data.success) {
                        alert(response.data.message);
                    } else {
                        if(response.data.success) {
                            window.location.href("/mypage");
                            alert("비밀번호가 변경되었습니다.")
                        } else {
                            alert("비밀번호 변경에 실패했습니다.")
                        }
                    }
                })
        }
    }

    return (
        <>
            <Header title="비밀번호 변경" topLink="/board" isBackButton={true} />
            <Formik
                initialValues={{
                    change_email: "",
                    change_email2: "",
                    user_passwd: ""
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmitPasswd}
            >
                {({values, handleSubmit, handleChange, errors}) => (
                    <StyledBox>
                        <form onSubmit={handleSubmit}>
                        <div style={titleBox}>
                            <MyPageTitle>새 비밀번호</MyPageTitle>
                            <p style={subtitle}>4~20자</p>
                        </div>
                        <MyPageInput
                            type="password"
                            name="change_passwd"
                            placeholder="새 비밀번호"
                            value={values.change_passwd}
                            onChange={handleChange}
                        />
                            <div style={errorMessage}>
                                {errors.change_passwd}
                            </div>
                        <MyPageInput
                            type="password"
                            name="change_passwd2"
                            placeholder="새 비밀번호 확인"
                            value={values.change_passwd2}
                            onChange={handleChange}
                        />
                            <div style={errorMessage}>
                                {errors.change_passwd2}
                            </div>
                        <MyPageTitle>계정 비밀번호</MyPageTitle>
                        <MyPageInput
                            type="password"
                            name="user_passwd"
                            placeholder="현재 비밀번호"
                            value={values.user_passwd}
                            onChange={handleChange}
                        />
                            <div style={errorMessage}>
                                {errors.user_passwd}
                            </div>
                        <div>
                            <p style={passwdAlert}>
                                <strong>※ 혹시 타인에게 계정을 양도하려고 하시나요?</strong>
                                <br/>에브리타임 이용약관에서는 타인에게 계정 판매, 양도 및 대여 등을 엄격하게 금지하고 있습니다.
                                계정 양도로 인해 사기, 불법 행위가 발생할 경우 관련법에 따라
                                <strong style={passwdWarning}>법적 책임을 지게 될 수 있습니다.</strong>
                            </p>
                            <p style={passwdAlert}>
                                <strong>※ 타인에 의한 계정 사용이 의심되시나요?</strong>
                                <br/>개인정보를 위해 비밀번호를 변경해주세요. 비밀번호를 변경하면
                                <strong style={passwdWarning}>모든 디바이스에서 즉시 로그아웃 처리됩니다.</strong>
                            </p>
                        </div>
                        <MyPageButton>비밀번호 변경</MyPageButton>
                        </form>
                    </StyledBox>
                )}
            </Formik>
            <Footer/>
        </>
    );
}

export default MypagePasswd;
