import {authAPI, EnumResultCode, EnumResultCodeForCaptcha, SecurityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'


interface IInitialState {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | false,
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | false,
    captchaUrl: null as string | null

};

const authReducer = (state = initialState, action: any): IInitialState => {
    switch(action.type) {
        case SET_USER_DATA: {
            return{...state, ...action.data, isAuth: true}
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return{...state, ...action.data}
        }
        default:
            return state;
    }
}

interface IDataSetAuthUserData {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | false,
}

interface ISetAuthUserData {
    type: typeof SET_USER_DATA
    data: IDataSetAuthUserData
}


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):
    ISetAuthUserData => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}})


interface IGetCaptchaUrlSuccess {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    data: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): IGetCaptchaUrlSuccess =>
    ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}})



export const getAuthUserDataThunk = () => async (dispatch: any) => {
    let dataMe = await authAPI.me()
            if (dataMe.resultCode === EnumResultCode.Success) {
                let {id, email, login} = dataMe.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
}


export const LoginThunk = (email: string | null, password: string | null, rememberMe: any, captcha: string | null) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then(response => {
            if (response.data.resultCode === EnumResultCode.Success) {
                dispatch(getAuthUserDataThunk())
            }
            else {
                if (response.data.resultCode === EnumResultCodeForCaptcha.CaptchaRequest){
                    dispatch(getCaptchaUrlThunk())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}))
            }
        });
};

export const LogOutThunk = () => (dispatch: any) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === EnumResultCode.Success) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};

export const getCaptchaUrlThunk = () => async (dispatch: any) => {
    const response = await SecurityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))

};


export default authReducer;