import {jwtDecode} from "jwt-decode";
import store from "../redux/configStore";
import {setAccToken, setReToken} from "../redux/reducers/AuthReducer";

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
