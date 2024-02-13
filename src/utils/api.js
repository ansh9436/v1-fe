import axios from 'axios';
import store from "../redux/configStore";
import {jwtUtils} from "./jwtUtils";

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? '' : 'https://api.eastflag.co.kr'
    baseURL: process.env.NODE_ENV === 'production' ? '' : ''
})

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
instance.interceptors.request.use((config) => {
    // HTTP Authorization 요청 헤더에 jwt-token 을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API 에 요청함.
   //const token = store.getState().Auth.token;
    console.info('api 에서 auth 값은', store.getState().Auth);
    const token = store.getState().Auth.accToken;
    try {
        //if (token && jwtUtils.isAuth(token)) {
        if (token) {
            //console.log('api 에서 user 정보', jwtUtils.getId(token));
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch(err) {
        console.error('[_axios.interceptors.request] config : ' + err);
    }
    return config;
},(err) => {
    // 요청 에러 직전 호출됩니다.
    console.error('api 에서 요청 에러출력', err);
    return Promise.reject(err);
});

/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */
instance.interceptors.response.use((response) => {
    //http status 가 200인 경우 응답 성공 직전 호출됩니다 .then() 으로 이어집니다.
    return response;
},async (err) => {
    /*
        http status 가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    //console.error('api 에서 응답 에러출력', err.response);
    console.error('api 에서 응답 에러출력');
    // const { data, status } = err.response;
    return Promise.reject(err);
});

export default instance;
