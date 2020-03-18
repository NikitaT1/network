import axios from "axios";
import {ProfileType} from "../types/types";



const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

});



export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            {
                withCredentials: true,
            })
            .then(response => {
                return response.data})
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`, {},)
            .then(responce => {
                return responce.data
            });
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`, {},)
            .then(responce => {
                return responce.data
            });
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status:status});
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
};

export enum EnumResultCode {
    Success = 0,
    Error = 1
}

export enum EnumResultCodeForCaptcha {
    CaptchaRequest = 10
}



type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: EnumResultCode | EnumResultCodeForCaptcha,
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login (email: string | null, password: any, rememberMe = false, captcha: null | string = null) {
    return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logOut () {
        return instance.delete(`auth/login`)
    },
};

export const SecurityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    },
};



