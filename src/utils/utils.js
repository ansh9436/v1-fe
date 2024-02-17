import {jwtDecode} from "jwt-decode";

export class utils {
    // 토큰 유효성 검사
    static isAuth(token) {
        if (!token) {
            return false;
        }
        const decoded = jwtDecode(token);
        //console.log('exp',decoded.exp, 'now',new Date().getTime() / 1000);
        if (decoded.exp > new Date().getTime() / 1000) {
            return true;
        } else {
            return false;
        }
    }

    // 토큰에서 유저 id 가져오기
    static getUser(token) {
        return jwtDecode(token);
    }

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
