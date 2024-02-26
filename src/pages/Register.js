import React, { /*useState*/ } from "react";
import axios from "axios";
import Header from "../components/Common/Header";
import RegisterInput from "../components/Register/RegisterInput";
import StyledContainer from "../components/Style/StyledContainer";
import StyledBox from "../components/Style/StyledBox";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import './Register.scss';


const Register = () => {
    const navigate = useNavigate();
    /*const [passEmail, setPassEmail] = useState(false);
    const [passNick, setPassNick] = useState(false);

    const checkEmail = (e) => {
        if (passEmail) {
            return false;
        } else {
            return checkUser('user_email', e.target.value);
        }
    }

    const checkNick = (e) => {
        if (passNick) {
            return false;
        } else {
            return checkUser('user_nick', e.target.value);
        }
    }

    const checkUser = (type, user_value) => {
        axios.post(`/api/du_check/${type}`, { user_value: user_value })
        .then((res) => {
            console.log(res);
            if(res.data.success) {
                if(type === 'user_email') {
                    setPassEmail(true);
                } else if(type === 'user_nick') {
                    setPassNick(true);
                } else {

                }
            } else {

            }
        })
        .catch((err) => {
            toast.error(err + "😭", {
                position: "top-center",
            });
        });
    }*/

    const validationSchema = Yup.object().shape({
        user_email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다!")
            .required("이메일을 입력하세요!"),
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
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
                "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
            )
            .required("닉네임을 입력하세요!"),
    });
    const submit = async (values) => {
        const { user_email, user_passwd, user_nick } = values;
        try {
            await axios.post("/api/join", {
                user_email: user_email,
                user_passwd: user_passwd,
                user_nick: user_nick,
            }).then(res => {
                console.log('res', res);
                if(res.data.success) {
                    toast.success(<h3>회원가입이 완료되었습니다.<br/>로그인 하세요😎</h3>, {
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
                        <Header link={"./"} title="회원가입" isBackButton={true} />
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
                                    name="userNickname"
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
