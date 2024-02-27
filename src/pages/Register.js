import React from "react";
import axios from "axios";
import Header from "../components/Common/Header";
import RegisterInput from "../components/Register/RegisterInput";
import StyledContainer from "../components/Style/StyledContainer";
import StyledBox from "../components/Style/StyledBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import './Register.scss';


const Register = () => {
    const navigate = useNavigate();
    const checkUser = async (type, user_value) => {
        let isSuccess = false;
        await axios.post(`/api/du_check/${type}`, {user_value: user_value})
            .then((res) => {
                console.info(`${type} 중복검사 ajax 결과값`, res.data);
                isSuccess = !!res.data.success;
            })
            .catch((err) => {
                console.info(`${type} 중복검사 ajax 에러`, err);
                isSuccess = false;
            });
        return isSuccess;
    }

    const userEmailCheck = function (){
        return this.test("userEmailCheck", async function (userValue) {
            let result;
            const {path, createError} = this;
            const regEmailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            console.log('이메일 넘어온 값', userValue);
            if (userValue !== undefined && regEmailExp.test(userValue)) {
                return new Promise(async (resolve) => {
                    const returnValue = await checkUser('user_email', userValue);
                    if (returnValue) {
                        result = true;
                    } else {
                        result = createError({path, message: "동일한 이메일 주소가 존재합니다."});
                    }
                    resolve(result);
                });
            } else {
                return createError({path, message: "올바른 닉네임을 입력해 주세요!"});
            }
        });
    };

    function userNickCheck() {
        return this.test("userNickCheck", async function (userValue) {
            let result;
            const {path, createError} = this;
            const regNickExp = /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/;
            console.log('닉네임 넘어온 값', userValue);
            if (userValue !== undefined && regNickExp.test(userValue)) {
                return new Promise(async (resolve) => {
                    result = await checkUser('user_nick', userValue) ?
                        true : createError({path, message: "동일한 닉네임이 존재합니다."});
                    resolve(result);
                });
            } else {
                return createError({path, message: "올바른 이메일 주소를 입력해 주세요!"});
            }
        });
    }

    Yup.addMethod(Yup.string, "userEmailCheck", userEmailCheck);
    Yup.addMethod(Yup.string, "userNickCheck", userNickCheck);
    const validationSchema = Yup.object().shape({
        user_email: Yup.string()
            .userEmailCheck()
            .required("올바른 이메일 주소를 입력해 주세요!!"),
        user_passwd: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다")
            .max(16, "비밀번호는 최대 16자리입니다!")
            .required("비밀번호를 입력하세요!")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
            ),
        user_passwd2: Yup.string()
            .oneOf([Yup.ref("user_passwd"), null], "비밀번호가 일치하지 않습니다!")
            .required("비밀번호 확인을 입력하세요!"),
        user_nick: Yup.string()
            .min(2, "닉네임은 최소 2글자 이상입니다!")
            .max(10, "닉네임은 최대 10글자입니다!")
            .userNickCheck()
            .required("닉네임을 입력하세요!"),
    });
    const submit = async (values) => {
        const {user_email, user_passwd, user_nick} = values;
        try {
            await axios.post("/api/join", {
                user_email: user_email,
                user_passwd: user_passwd,
                user_nick: user_nick,
            }).then(res => {
                console.log('res', res);
                if (res.data.success) {
                    toast.success(<h3>회원가입이 완료되었습니다.<br/>로그인 하세요😎</h3>, {
                        position: "top-center",
                        autoClose: 2000
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    toast.error(res.data.message + "😭", {
                        position: "top-center",
                    });
                }
            });
        } catch (e) {
            toast.error(e.response.data.message + "😭", {
                position: "top-center",
            });
        }
    }

    return (
        <Formik
            initialValues={{
                user_email: "",
                user_passwd: "",
                user_passwd2: "",
                user_nick: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
        >
            {({values, handleSubmit, handleChange, errors}) => (
                <StyledContainer>
                    <ToastContainer/>
                    <div>
                        <Header link={"./"} title="회원가입" isBackButton={true}/>
                        <StyledBox padding="18px 16px" lineHeight="20px">
                            <form onSubmit={handleSubmit}>
                                <RegisterInput
                                    labelName="이메일"
                                    name="user_email"
                                    type="email"
                                    placeholder="이메일"
                                    onChange={handleChange}
                                    value={values.user_email}
                                    autoComplete='off'
                                />
                                <div className="error-message">
                                    {errors.user_email}
                                </div>
                                <RegisterInput
                                    labelName="비밀번호"
                                    name="user_passwd"
                                    type="password"
                                    placeholder="비밀번호"
                                    onChange={handleChange}
                                    value={values.user_passwd}
                                    autoComplete='new-password'
                                />
                                <div className="error-message">
                                    {errors.user_passwd}
                                </div>
                                <RegisterInput
                                    labelName="비밀번호 확인"
                                    name="user_passwd2"
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    onChange={handleChange}
                                    value={values.user_passwd2}
                                    autoComplete='new-password'
                                />
                                <div className="error-message">
                                    {errors.user_passwd2}
                                </div>
                                <RegisterInput
                                    labelName="닉네임"
                                    name="user_nick"
                                    type="text"
                                    placeholder="닉네임"
                                    onChange={handleChange}
                                    value={values.user_nick}
                                    autoComplete='off'
                                />
                                <div className="error-message">
                                    {errors.user_nick}
                                </div>
                                <button type="submit" className="register-button">회원가입</button>
                            </form>
                        </StyledBox>
                    </div>
                </StyledContainer>
            )}
        </Formik>
    );
}

export default Register;
