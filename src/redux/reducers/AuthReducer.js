const SET_ACC_TOKEN = 'set_acc_token';
const SET_RE_TOKEN = 'set_re_token';
//const SET_USER_INFO = 'set_user_info';

const AuthInitialState = {
    accToken: null,
    reToken: null,
    //userInfo: null,
}

export const setAccToken = (accToken) => ({
    type: SET_ACC_TOKEN,
    accToken
})

export const setReToken = (reToken) => ({
    type: SET_RE_TOKEN,
    reToken
})

/*export const setUserInfo = (userInfo) => ({
    type: SET_USER_INFO,
    userInfo
})*/

export const AuthReducer = (state = AuthInitialState, action) => {
    switch(action.type) {
        case SET_ACC_TOKEN:
            return {
                ...state,
                accToken: action.accToken
            }
        case SET_RE_TOKEN:
            return {
                ...state,
                reToken: action.reToken
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}
