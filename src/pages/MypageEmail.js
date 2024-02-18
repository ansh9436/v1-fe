import React, {useState} from 'react';
import api               from '../utils/api';
import { utils }     from '../utils/utils';
import Header        from '../components/Common/Header';
import Footer        from '../components/Common/Footer';
import StyledBox     from '../components/Style/StyledBox';
import MyPageTitle   from '../components/Style/MyPageTitle';
import MyPageInput   from '../components/Style/MyPageInput';
import MyPageButton  from '../components/Style/MyPageButton';
import {useSelector} from "react-redux";


const MypageEmail = () => {
    const accToken = useSelector(state => state.Auth.accToken);
    const { user_email } = utils.getUser(accToken);
    const [inputs, setInput] = useState({
        change_email: "",
        user_passwd: "",
    });

    const textBox = {
        marginTop: '12px'
    }

    const emailAlert = {
        color: '#999',
        fontSize: '12px',
        lineHeight: '18px',
        marginTop: '8px'
    }

    const emailWarning = {
        color: '#c62917',
        fontSize: '12px',
        lineHeight: '18px',
        marginTop: '8px'
    }

    const onChangeEmailFrm = (e) => {
        const { value, name } = e.currentTarget;
        setInput({
            ...inputs,
            [name]: value,
        });
    }

    const onSubmitEmailFrm = (e) => {
        e.preventDefault();
        api.post('/api/mypage/email', {})
            .then((response) => {
                if(response.data.success) {
                    window.location.href("/login");
                    alert("이메일이 변경되었습니다.");
                } else {
                    alert("이메일 변경에 실패했습니다.");
                }
            })
    }

    return (
        <>
            <Header title="이메일 변경" topLink={"/mypage"} isBackButton={true} />
            <form onSubmit={onSubmitEmailFrm}>
                <StyledBox>
                    <MyPageTitle>이메일</MyPageTitle>
                    <MyPageInput
                        name="change_email"
                        placeholder="이메일"
                        value={user_email}
                        onChange={onChangeEmailFrm}
                    />
                    <MyPageTitle>계정 비밀번호</MyPageTitle>
                    <MyPageInput
                        type="password"
                        name="user_passwd"
                        placeholder="계정 비밀번호"
                        onChange={onChangeEmailFrm}
                    />
                    <div style={textBox}>
                        <p style={emailWarning}>※ 반드시 본인의 이메일을 입력해주세요.</p>
                        <strong style={emailAlert}>
                            ※ 계정 분실 시 아이디/비밀번호 찾기, 개인정보 관련 주요 고지사항 안내 등에 사용됩니다.
                        </strong>
                    </div>
                    <MyPageButton margin="20px 0px 20px 0px">이메일 변경</MyPageButton>
                </StyledBox>
            </form>
            <Footer/>
        </>
    )
};

export default MypageEmail
