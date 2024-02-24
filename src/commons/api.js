import axios from 'axios';
import store from "../redux/configStore";
import { setAccToken, setReToken } from "../redux/reducers/AuthReducer";

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'prod' ? '' : 'https://api.eastflag.co.kr'
    baseURL: process.env.NODE_ENV === 'prod' ? '' : ''
});

/**
 *   1. 요청 인터셉터
 *       2개의 콜백 함수를 받습니다.
 */
instance.interceptors.request.use((config) => {
    // HTTP Authorization 요청 헤더에 jwt-token 을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API 에 요청함.
    try {
        if (store.getState().Auth["accToken"]) {
            const accToken = store.getState().Auth["accToken"];
            console.info('헤더 삽입된 액세세 토큰', accToken);
            config.headers.Authorization = `Bearer ${accToken}`;
        } else {
            window.location.href = "/login";
            alert("엑세스토큰이 없습니다. 다시 로그인 해주세요.");
        }
        return config;
    } catch (err) {
        console.error('엑시오스 헤더 삽입중 에러 : ' + err);
    }
    return config;
}, (err) => {
    // 요청 에러 직전 호출됩니다.
    console.error('api 에서 요청인터셉터 에러', err);
    return Promise.reject(err);
});

/**
 *   2. 응답 인터셉터
 *       2개의 콜백 함수를 받습니다.
 */
instance.interceptors.response.use((response) => { //status 가 200인 경우 then 이어짐
        return response;
    }
    , async (err) => {  // status 가 200이 아닌경우 응답에러직전 호출. .catch() 으로 이어짐
        const {data, status} = err.response;

        if (status === 401) {  // 리플래쉬 토큰으로 엑세스 토큰 재발금
            const reToken = store.getState().Auth["reToken"];
            const originalRequest = err.config;

            console.log('리플래쉬토큰으로 발급 받기때 사용할 리플래쉬 토큰', reToken);
            if (!reToken) {
                console.log('저장소 전체', store.getState().Auth);
            }

            console.info('401 api 에서 응답 에러출력', data, status);
            await axios.get("/api/refresh", {
                headers: {
                    "Authorization": `Bearer ${reToken}`
                }
            })
            .then((res) => {
                console.log('새로 발급받은 엑세스 토큰', res);
                const newAccessToken = res.data["resultData"]["accessToken"];
                store.dispatch(setAccToken(newAccessToken));
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                //store.dispatch(setUserInfo(res.data['resultData']['userInfo']));
                //localStorage.setItem('userInfo', JSON.stringify(res.data['resultData']['userInfo']))
            })
            .catch((e) => {   // 에러시 저장소를 지우고 로그인페이지로
                /*store.dispatch(setAccToken(''));
                store.dispatch(setReToken(''));
                store.dispatch(setUserInfo(''));*/
                console.error('엑세스 토큰 발급중 에러 : ' + e);
                //window.location.href = "/login";
                alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요.");
                return false;
            });
            return axios(originalRequest);
        } else if (status === 403) {     // 토큰 리셋후 로그인 페이지로
            console.error('403 api 에서 응답 에러출력', data, status, err);
            window.location.href = "/login";
            alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요.");
            return false;
        }
    return Promise.reject(err);
});

export default instance;
