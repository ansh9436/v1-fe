import React, {useState} from 'react';
import api               from '../utils/api';
import { utils }                      from '../utils/utils';
import Header                         from '../components/Common/Header';
import Footer                         from '../components/Common/Footer';
import StyledBox                      from '../components/Style/StyledBox';
import MyPageTitle                    from '../components/Style/MyPageTitle';
import MyPageInput                    from '../components/Style/MyPageInput';
import MyPageButton                   from '../components/Style/MyPageButton';
import {useSelector}                  from "react-redux";

const MypageNickname = () => {
    const accToken = useSelector(state => state.Auth.accToken);
    const { user_nick } = utils.getUser(accToken);
    const [inputs, setInput] = useState({
        change_nick: "",
        user_passwd: "",
    });

    const nickAlert = {
        color: '#757575',
        fontSize: '12px',
        fontWeight: 'normal'
    };

    const nickWarning = {
        color: '#c62917',
        marginLeft: '4px',
        fontWeight: 'normal'
    };

    const onChangeNickFrm = (e) => {
        const { value, name } = e.currentTarget;
        setInput({
            ...inputs,
            [name]: value,
        });
    }

    const onSubmitNickFrm = (e) => {
        e.preventDefault();
        api.post('/api/mypage/nickname', {})
            .then((response) => {
                if(response.status === 200) {
                    alert("닉네임이 변경되었습니다.");
                    window.location.href("/mypage");
                } else {
                    alert("닉네임 변경에 실패했습니다.")
                }
            })
    }

    return (
        <>
            <Header title="닉네임 설정" topLink={"/mypage"} isBackButton={true} />
            <StyledBox lineHeight="40px">
                <form onSubmit={onSubmitNickFrm}>
                    <MyPageTitle>닉네임</MyPageTitle>
                    <MyPageInput
                        placeholder="닉네임"
                        name="change_nick"
                        value={user_nick}
                        onChange={onChangeNickFrm}
                    />
                    <MyPageTitle>계정 비밀번호</MyPageTitle>
                    <MyPageInput
                        type="password"
                        name="user_passwd"
                        placeholder="계정 비밀번호"
                        onChange={onChangeNickFrm}
                    />
                    <p style={nickAlert}>※ 닉네임을 설정하면
                        <strong style={nickWarning}>30일간 변경 할 수 없습니다.</strong>
                    </p>
                    <MyPageButton margin="10px 0px 20px 0px">닉네임 변경</MyPageButton>
                </form>
            </StyledBox>
            <Footer/>
        </>
    )
};

export default MypageNickname;
