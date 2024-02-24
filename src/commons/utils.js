import {jwtDecode} from "jwt-decode";
import store from "../redux/configStore";
import { setAccToken, setReToken, /*setUserInfo*/ } from "../redux/reducers/AuthReducer";
import api from "./api";
import {toast} from "react-toastify";
import React from "react";

export class jwtUtils {
    static isAuth() {
        try {
            const accToken = store.getState().Auth["accToken"];
            return !!accToken;
        } catch (err) {
            console.error('isAuth 중 에러', err);
            return false;
        }
    }

    static clearToken() {
        try {
            store.dispatch(setAccToken(''));
            store.dispatch(setReToken(''));
            //store.dispatch(setUserInfo(''));
        } catch (err) {
            console.error('clearToken 중 에러', err);
        }
    }

    // 토큰에서 유저 정보 가져오기
    static getUser() {
        try {
            const accToken = store.getState().Auth["accToken"];
            return jwtDecode(accToken);
        } catch (err) {
            console.error('getUser 중 에러', err);
            return {};
        }
    }

    static async tokenPublish() {
        await api.get("/api/refresh/both")
            .then(res => {
                if (res.data.success) {
                    jwtUtils.setAccToken(res.data["resultData"]["accessToken"]);
                    jwtUtils.setReToken(res.data["resultData"]["refreshToken"]);
                } else {
                    console.error('두개 토큰 재발행중 에러',res.data.message);
                }
            })
            .catch((e) => {
                console.error(e.response.data.message);
                toast.error(<h3>프로필 이미지 변경 중 에러가 발생했습니다.</h3>, {
                    position: "top-center",
                });
            });
    }

    static setAccToken(accToken) {
        try {
            store.dispatch(setAccToken(accToken));
        } catch(err) {
            console.error('util setAcc.. 중 에러', err);
        }
    }

    static setReToken(reToken) {
        try {
            store.dispatch(setReToken(reToken));
        } catch(err) {
            console.error('util setRe.. 중 에러', err);
        }
    }

    /*static setUserInfo(userInfo) {
        try {
            store.dispatch(setUserInfo(userInfo));
        } catch(err) {
            console.error('util setUs.. 중 에러', err);
        }
    }*/
}

export class utils {
    // 한달전 일년 이런식 날짜 변환
    static getUpdateTime(time) {
        const now = new Date();
        const writtenTime = new Date(time);

        const TimeDiff = Math.floor((now.getTime() - writtenTime) / 1000 / 60);
        const TimeDiffHour = Math.floor(TimeDiff / 60);
        const TimeDiffDay = Math.floor(TimeDiff / 60 / 24);

        if (TimeDiff < 1) {
            return '방금 전'
        } else if (TimeDiff < 60) {
            return `${TimeDiff}분 전`;
        } else if (TimeDiffHour < 24) {
            return `${TimeDiffHour}시간 전`;
        } else if (TimeDiffDay < 365) {
            return `${TimeDiffDay}일 전`;
        } else {
            return `${Math.floor(TimeDiffDay / 365)}년 전`;
        }
    }
}
