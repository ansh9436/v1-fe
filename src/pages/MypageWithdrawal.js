import React, { useState } from 'react';
import api from '../commons/api';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import StyledBox from '../components/Style/StyledBox';
import MyPageTitle from '../components/Style/MyPageTitle';
import MyPageInput from '../components/Style/MyPageInput';
import MyPageButton from '../components/Style/MyPageButton';

const MypageWithdrawal = () => {
    const wAlert = {
        color: '#757575',
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '18px',
        marginTop: '16px'
    };
    const [CurrentPassword, setCurrentPassword] = useState("");
    const userFrom = localStorage.getItem('userId');
    const onChangeHandler = (e) => {
        setCurrentPassword(e.currentTarget.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            _id: userFrom,
            password: CurrentPassword
        }
        api.post('/user/withdrawal', body)
            .then((response) => {
                if(!response.data.success) {
                    alert(response.data.message);
                } else {
                    if(response.data.success) {
                        alert("회원탈퇴가 완료되었습니다.");
                        window.location.href("/");
                    } else {
                        alert("회원탈퇴에 실패했습니다.")
                    }
                }
            })
    }

    return (
        <>
            <Header title='회원탈퇴' topLink="/board" isBackButton={true} />
            <StyledBox>
                <form onSubmit={onSubmitHandler}>
                    <MyPageTitle>계정 비밀번호</MyPageTitle>
                    <MyPageInput
                        type="password"
                        placeholder="계정 비밀번호"
                        value={CurrentPassword}
                        onChange={onChangeHandler}
                    />
                    <p style={wAlert}>
                        ※ 개인정보, 시간표 등의 데이터가 삭제되며, 복구할 수 없습니다.
                        <br/> ※ 작성한 게시물은 삭제되지 않으며, 알수없음으로 닉네임이 표시됩니다.
                        <br/> ※ 자세한 내용은 개인정보 처리방침을 확인해주세요.
                    </p>
                    <MyPageButton type="submit">회원탈퇴</MyPageButton>
                </form>
            </StyledBox>
            <Footer/>
        </>
    )
};

export default MypageWithdrawal;