import React  from 'react';
import api               from '../commons/api';
import { jwtUtils }     from '../commons/utils';
import Header        from '../components/Common/Header';
import Footer        from '../components/Common/Footer';
import StyledBox     from '../components/Style/StyledBox';
import MyPageTitle   from '../components/Style/MyPageTitle';
import MyPageInput   from '../components/Style/MyPageInput';
import MyPageButton  from '../components/Style/MyPageButton';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Formik} from "formik";
import * as Yup from "yup";


const MypageEmail = () => {
    let { user_email } = jwtUtils.getUser();

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
        const { user_passwd, change_email } = values;

        await api.put("/api/mypage", {
            user_passwd: user_passwd,
            change_email: change_email,
            type: 'email'
        })
        .then(async res => {
            if (res.data.success) {
                toast.success(<h3>이메일 변경 완료되었습니다.😎</h3>, {
                    position: "top-center",
                    autoClose: 2000
                });
                values.change_nick = '';
                values.user_passwd = '';
                user_email = change_email;
                return await jwtUtils.tokenPublish();
            } else {
                if (res.data.message === 'MypagePasswordNotCompare') {
                    toast.error(<h3>비밀번호가 일치하지 않습니다.</h3>, {
                        position: "top-center",
                    });
                } else {
                    console.error(res.data.message);
                    toast.error(<h3>이메일 변경 중 에러가 발생했습니다.<br/>다시 시도 하세요</h3>, {
                        position: "top-center",
                    });
                }
            }
        })
        .catch((e) =>{
            console.error(e.response.data.message);
            toast.error(<h3>이메일 변경 중 에러가 발생했습니다.</h3>, {
                position: "top-center",
            });
        });
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
                        <MyPageTitle>기존의 이메일은 <><font color='blue'>{user_email}</font></> 입니다.</MyPageTitle>
                        <MyPageInput
                            type="text"
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
                            autoComplete='new-password'
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
