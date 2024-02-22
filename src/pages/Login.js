import { Link, useNavigate, useSearchParams } from "react-router-dom";
import './login.scss';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAccToken, setReToken } from "../redux/reducers/AuthReducer";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 쿼리 파라미터 받아오기
    const [searchParams] = useSearchParams();
    const validationSchema = Yup.object().shape({
        user_email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다!")
            .required("이메일을 입력하세요!"),
        user_passwd: Yup.string()
            .required("비밀번호를 입력하세요!")
    });
    const submit = async (values) => {
        const {user_email, user_passwd} = values;
        try {
            const {data} = await axios.post("/api/login", {
                user_email,
                user_passwd,
            });
            console.log('로그인 result', data);
            if (data.success && data.message === 'OK') {
                dispatch(setAccToken(data['resultData']['accessToken']));
                dispatch(setReToken(data['resultData']['refreshToken']));
                const redirectUrl = searchParams.get("redirectUrl");
                toast.success(<h3>로그인 성공😎</h3>, {
                    position: "top-center",
                    //autoClose: 2000,
                });
                // redirectUrl 이 쿼리스트링으로 존재하면
                // 원래가고자 했던 페이지로 돌아가기
                setTimeout(() => {
                    if (redirectUrl) {
                        navigate(redirectUrl);
                    } else {
                        navigate("/board");
                    }
                }, 1000);
            } else {
                toast.error(data.message + "😭", {
                    position: "top-center",
                });
            }
        } catch (e) {
            toast.error(e.response.data.message + "😭", {
                position: "top-center",
            });
        }
    };

    return (
        <Formik
            initialValues={{
                user_email: "",
                user_passwd: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
        >
            {({values, handleSubmit, handleChange}) => (
                <div className='styledContainer'>
                    <ToastContainer/>
                    <div>
                        <div className='flexBox'>
                            <img className='logo' src={'/assets/logo.png'} alt="logo"/>
                            <h2 className='logoTitle'>지금
                                <strong> 에브리타임</strong>
                                을 시작하세요!
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input className='styledInput'
                                   type='email'
                                   name='user_email'
                                   placeholder='이메일'
                                   onChange={handleChange}
                                   value={values.user_email}
                            />
                            <div className="error-message">
                                <ErrorMessage name="user_email"/>
                            </div>
                            <input className='styledInput'
                                   type='password'
                                   name='user_passwd'
                                   placeholder='비밀번호'
                                   onChange={handleChange}
                                   value={values.user_passwd}
                            />
                            <div className="error-message">
                                <ErrorMessage name="user_passwd"/>
                            </div>
                            <button className='styledButton' type="submit">로그인</button>
                        </form>
                        <div className='styledDiv'>
                            <Link to="./register">
                                <span className='styledSpan'>에브리타임에 처음이신가요?</span>회원가입
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Login;
