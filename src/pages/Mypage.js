import React, {useEffect, useState} from 'react';
import api from '../commons/api';
import {Link} from "react-router-dom";
import Header from "../components/Common/Header";
import StyledBox from '../components/Style/StyledBox';
import LogoutButton from '../components/Common/LogoutButton';
import Footer from "../components/Common/Footer";
import "./Mypage.scss";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtUtils } from "../commons/utils";

const Mypage = () => {
    const [image, setImage] = useState({
        imgFile: '',
        profileImg: '/assets/profile.png',
    });
    //const [userInfo, setUserInfo] = useState({});
    const [userInfo, setUserInfo] = useState(jwtUtils.getUser());

    const onCancel = () => {
        setImage({
            imgFile: "", profileImg: userInfo["user_image"]
        });
    }

    const submitProfileImg = async () => {
        const formData = new FormData();
        formData.append("att_file", image.imgFile);
        formData.append("top_seq", 0);
        formData.append("ftype", 'U');

        await api.post("/api/upload", formData)
            .then(async res => {
                if (res.data.success) {
                    setImage({
                        imgFile: "", profileImg: image.profileImg
                    });
                    toast.success(<h3>프로필 이미지 변경이 완료되었습니다😎</h3>, {
                        position: "top-center",
                        autoClose: 2000
                    });
                    return await jwtUtils.tokenPublish();
                } else {
                    console.error(res.data.message);
                    toast.error(<h3>프로필 이미지 변경 중 에러가 발생했습니다.<br/>다시 시도 하세요</h3>, {
                        position: "top-center",
                    });
                }
            })
            .catch((e) => {
                console.error(e.response.data.message);
                toast.error(<h3>프로필 이미지 변경 중 에러가 발생했습니다.</h3>, {
                    position: "top-center",
                });
            });
    }

    let inputRef;
    const saveImage = (e) => {
        console.log('setImage 작동');
        e.preventDefault();
        const fileReader = new FileReader();
        console.log('선택이미지는 ', e.target.files[0]);
        if (e.target.files[0]) {
            console.log('setImage 작동 ok');
            fileReader.readAsDataURL(e.target.files[0]);
        }

        fileReader.onload = () => {
            setImage({
                imgFile: e.target.files[0],
                profileImg: fileReader.result,
            });
        };
    }

    useEffect(() => {
        const getUserInfo = async () => {
            const {data} = await api.post(`/api/mypage/user/info`);
            return data;
        };

        getUserInfo()
            .then(data => {
                if (data.success) {
                    const {user_email, user_nick, user_image} = data["resultData"];
                    const userImg = process.env.REACT_APP_API_URL+'/'+user_image;
                    setUserInfo({
                        user_email: user_email,
                        user_nick: user_nick,
                        user_image: userImg
                    });
                    setImage({
                        imgFile: "",
                        profileImg: userImg
                    });
                } else {
                    console.error(data.message);
                    toast.error(<h3>프로필 로딩 중 에러가 발생했습니다.</h3>, {
                        position: "top-center",
                    });
                }
            }).catch(e => {
                console.error(e.response.data.message);
                toast.error(<h3>프로필 로딩 중 에러가 발생했습니다.</h3>, {
                    position: "top-center",
                });
        });


    }, [])

    return (
        <>
            <Header title="마이페이지" topLink="/mypage" isBackButton={true} backLink={'/board'}/>
            <StyledBox padding="10px 0" lineHeight="auto">
                <ToastContainer/>
                <div className="profile-box">
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={saveImage}
                            ref={(refParam) => (inputRef = refParam)}
                            style={{display: "none"}}
                        />
                        <img className="profileImage" src={image.profileImg} alt="profileImage"
                             onClick={() => inputRef.click()}/>
                        <div className="nickname">{userInfo["user_nick"]}</div>
                        <div className="profileID">{userInfo["user_email"]}</div>
                    </div>
                    {typeof image.imgFile === 'object' &&
                    <>
                        <div className="profile-select-btn" onClick={submitProfileImg}>
                            프로필 이미지 확인
                        </div>
                        <div className="profile-select-btn" onClick={onCancel}>
                            프로필 이미지 취소
                        </div>
                    </>
                    }
                    <div className="profile-btn">
                        <LogoutButton/>
                    </div>
                </div>
            </StyledBox>
            <StyledBox>
                <li className='boxTitle'>계정</li>
                <li className='boxMenu'>
                    <Link to="/mypage/nickname">닉네임 설정</Link>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/email">이메일 변경</Link>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/passwd">비밀번호 변경</Link>
                </li>
            </StyledBox>
            <StyledBox>
                <li className='boxTitle'>커뮤니티</li>
                <li className='boxMenu'>
                    <Link to="/mypage/posted/board">내가 쓴 글</Link>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/posted/comment">내가 댓글 단 글</Link>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/posted/like">내가 좋아한 글</Link>
                </li>
            </StyledBox>
            <StyledBox>
                <li className='boxTitle'>기타</li>
                <li className='boxMenu'>
                    <LogoutButton/>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/withdrawal">회원탈퇴</Link>
                </li>
            </StyledBox>

            <Footer/>
        </>
    );
}

export default Mypage;
