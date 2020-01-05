import {authAPI, SecurityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null

};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return{...state, ...action.data, isAuth: true}
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            debugger
            return{...state, ...action.data}
        }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) =>
    ({type: SET_USER_DATA, data: {userId, email, login, isAuth}})

export const getCaptchaUrlSuccess = (captchaUrl) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}})

export const getAuthUserDataThunk = () => async (dispatch) => {
    let response = await authAPI.me()
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
}

export const LoginThunk = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunk());
            }
            else {
                if (response.data.resultCode === 10){
                    dispatch(getCaptchaUrlThunk())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}))
            }
        });
};

export const LogOutThunk = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};

export const getCaptchaUrlThunk = () => async (dispatch) => {
    const response = await SecurityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))

};


export default authReducer;