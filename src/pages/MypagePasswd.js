import React, { useState } from 'react';
import api from '../utils/api';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import StyledBox from '../components/Style/StyledBox';
import MyPageTitle from '../components/Style/MyPageTitle';
import MyPageInput from '../components/Style/MyPageInput';
import MyPageButton from '../components/Style/MyPageButton';

const MypagePasswd = () => {

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
    const [inputs, setInput] = useState({
        currentPassword: "",
        checkPassword: "",
        newPassword: "",
    });
    const { currentPassword, checkPassword, newPassword } = inputs;
    const userFrom = localStorage.getItem('userId');

    const onChangeHandler = (e) => {
        const { value, name } = e.currentTarget;
        setInput({
            ...inputs,
            [name]: value,
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            _id: userFrom,
            oldPassword: currentPassword,
            newPassword: newPassword
        }
        if(newPassword !== checkPassword) {
            alert("새 비밀번호를 확인해주세요.")
        } else {
            api.post('/user/update/password', body)
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
            <form onSubmit={onSubmitHandler}>
                <StyledBox>
                    <div style={titleBox}>
                        <MyPageTitle>새 비밀번호</MyPageTitle>
                        <p style={subtitle}>4~20자</p>
                    </div>
                    <MyPageInput
                        type="password"
                        name="newPassword"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={onChangeHandler}
                    />
                    <MyPageInput
                        type="password"
                        name="checkPassword"
                        placeholder="새 비밀번호 확인"
                        value={checkPassword}
                        onChange={onChangeHandler}
                    />
                    <MyPageTitle>계정 비밀번호</MyPageTitle>
                    <MyPageInput
                        type="password"
                        name="currentPassword"
                        placeholder="현재 비밀번호"
                        value={currentPassword}
                        onChange={onChangeHandler}
                    />
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
                </StyledBox>
            </form>
            <Footer/>
        </>
    )
};

export default MypagePasswd;