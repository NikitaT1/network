import {profileAPI, usersAPI} from "../api/api";
import {toggleFollowingProgress} from "./users-reducer";

const ADD_POST = 'network/profile/ADD-POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_STATUS = 'network/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Morning!', likesCount: 11},
        {id: 3, message: 'Welcome', likesCount: 11},
        {id: 4, message: 'Hi', likesCount: 11}
    ],
    newPostText: 'Hello!',
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

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
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}


export const addPostActionCreator = (text) => ({type: ADD_POST, text: text});
export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfileThunk = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}

export const getStatusThunk = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}

export const updateStatusThunk = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}

export const savePhotoThunk = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}


export default profileReducer;