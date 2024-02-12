import {jwtDecode} from "jwt-decode";

export class jwtUtils {
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
    static getId(token) {
        const decoded = jwtDecode(token)

        //return decoded.data.userid;
        // payload 전체 가지고 오는거로 바꿈
        return decoded.data;
    }

}
