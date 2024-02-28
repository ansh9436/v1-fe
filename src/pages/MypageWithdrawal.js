import React from 'react';
import api from '../commons/api';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import StyledBox from '../components/Style/StyledBox';
import MyPageTitle from '../components/Style/MyPageTitle';
import MyPageInput from '../components/Style/MyPageInput';
import MyPageButton from '../components/Style/MyPageButton';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { jwtUtils } from "../commons/utils";

const MypageWithdrawal = () => {
    const navigate = useNavigate();
    const wAlert = {
        color: '#757575',
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '18px',
        marginTop: '16px'
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
    });
    const onSubmitWithdrawal = async (values) => {
        const {user_passwd} = values;
        await api.delete('/api/mypage', {data: {user_passwd: user_passwd}})
            .then((res) => {
                if (res.data.success) {
                    toast.success(<h3>탈퇴 처리가 완료되었습니다.😎</h3>, {
                        position: "top-center",
                        autoClose: 2000
                    });
                    jwtUtils.setAccToken('');
                    jwtUtils.setReToken('');
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    if (res.data.message === 'MypagePasswordNotCompare') {
                        toast.error(<h3>비밀번호가 일치하지 않습니다.</h3>, {
                            position: "top-center",
                        });
                    } else {
                        console.error(res.data.message);
                        toast.error(<h3>탈퇴 처리 중 에러가 발생했습니다.<br/>다시 시도 하세요</h3>, {
                            position: "top-center",
                        });
                    }
                }
            })
    }

    return (
        <>
            <Header title='회원탈퇴' topLink="/board" isBackButton={true}/>
            <Formik
                initialValues={{
                    user_passwd: ""
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmitWithdrawal}
            >
                {({values, handleSubmit, handleChange, errors}) => (
                    <StyledBox>
                        <ToastContainer/>
                        <MyPageTitle>계정 비밀번호</MyPageTitle>
                        <form onSubmit={handleSubmit}>
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
                            <p style={wAlert}>
                                ※ 개인정보 등의 데이터가 삭제되며, 복구할 수 없습니다.
                                <br/> ※ 작성한 게시물은 삭제되지 않으며, 알수없음으로 닉네임이 표시됩니다.
                                <br/> ※ 자세한 내용은 개인정보 처리방침을 확인해주세요.
                            </p>
                            <MyPageButton type="submit">회원탈퇴</MyPageButton>
                        </form>
                    </StyledBox>
                )}
            </Formik>
            <Footer/>
        </>
    )
};

export default MypageWithdrawal;
