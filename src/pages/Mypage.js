import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import StyledBox from '../components/Style/StyledBox';
import LogoutButton from '../components/Common/LogoutButton';

const Mypage = () => {
    return (
        <>
            <Header title="마이페이지" topLink="/mypage" isBackButton={true} backLink={'/board'}/>
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
                    <Link to="/mypage/board">내가 쓴 글</Link>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/comment">내가 댓글 단 글</Link>
                </li>
                <li className='boxMenu'>
                    <Link to="/mypage/favorite">내가 좋아한 글</Link>
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
        </>
    );
}

export default Mypage;
