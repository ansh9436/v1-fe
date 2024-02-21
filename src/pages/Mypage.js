import React, { useCallback, useState } from 'react';
import api               from '../commons/api';
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import StyledBox from '../components/Style/StyledBox';
import LogoutButton from '../components/Common/LogoutButton';
import Footer from "../components/Common/Footer";
import "./Mypage.scss";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../components/Mypage/UserProfile";
import { jwtUtils } from "../commons/utils";

const Mypage = () => {
    const user = jwtUtils.getUser();
    const myProfileImg = 'http://localhost:8080/'+user["user_image"];
    const [image, setImage] = useState({imgFile: "", profileImg: myProfileImg,});

    const submitProfileImg = useCallback(async () => {
        const formData = new FormData();
        console.log('받은 이미지는 ', image.imgFile);
        formData.append("att_file", image.imgFile);
        formData.append("top_seq", 0);
        formData.append("ftype", 'U');

        await api.post("/api/upload", formData)
        .then(res =>{
            console.log('res',res);
            if(res.data.success) {
                toast.success(<h3>프로필 이미지 변경이 완료되었습니다😎</h3>, {
                    position: "top-center",
                    autoClose: 2000
                });
            } else {
                console.error(res.data.message);
                toast.error(<h3>프로필 이미지 변경 중 에러가 발생했습니다.<br/>다시 시도 하세요</h3>, {
                    position: "top-center",
                });
            }
        })
        .catch((e) =>{
            console.error(e.response.data.message);
            toast.error("이메일 변경 중 에러가 발생했습니다😭", {
                position: "top-center",
            });
        });
    }, [image.imgFile]);

    return (
        <>
            <Header title="마이페이지" topLink="/mypage" isBackButton={true} backLink={'/board'}/>
            <StyledBox padding="10px 0" lineHeight="auto">
                <ToastContainer/>
                <div className="profile-box">
                    <UserProfile profileImg={image.profileImg} setImage={setImage} submitProfileImg={submitProfileImg}/>
                    <div className="profile-btn">
                        <LogoutButton />
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

            <Footer />
        </>
    );
}

export default Mypage;
