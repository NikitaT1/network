import {profileAPI, usersAPI} from "../api/api";
import {toggleFollowingProgress} from "./users-reducer";
import {stopSubmit} from "redux-form";

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_STATUS = 'network/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

type postsType = {
    id: number
    message: string
    likesCount: number
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type photosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: photosType
}

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Morning!', likesCount: 11},
        {id: 3, message: 'Welcome', likesCount: 11},
        {id: 4, message: 'Hi', likesCount: 11}
    ] as Array<postsType>,
    newPostText: 'Hello!',
    profile: null as ProfileType | null,
    status: ""
};

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status:action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    text: string
}
export const addPostActionCreator = (text: string): AddPostActionCreatorType => ({type: ADD_POST, text: text});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType =>
    ({type: SET_USER_PROFILE, profile});

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: photosType
}
export const savePhotoSuccess = (photos: photosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfileThunk = (userId: number) => {
    return (dispatch: any) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}
export const getStatusThunk = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}
export const updateStatusThunk = (status: string) => {
    return (dispatch: any) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}
export const savePhotoThunk = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const saveProfileThunk = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfileThunk(userId))
        }
        else {
            //dispatch(stopSubmit("editProfile", {"contacts": {"facebook": response.data.messages[0]}}))
            dispatch(stopSubmit("editProfile", {_error: response.data.messages[0] }))
            return Promise.reject(response.data.messages[0])
        }
    }
}


export default profileReducer;