const SET_ACC_TOKEN = 'set_acc_token';
const SET_RE_TOKEN = 'set_re_token';

const AuthInitialState = {
    token: null
}

export const setAccToken = (token) => ({
    type: SET_ACC_TOKEN,
    token
})

export const setReToken = (token) => ({
    type: SET_RE_TOKEN,
    token
})

export const AuthReducer = (state = AuthInitialState, action) => {
    switch(action.type) {
        case SET_ACC_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case SET_RE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}
