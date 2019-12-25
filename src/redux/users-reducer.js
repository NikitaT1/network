import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_TOGGLE = 'SET_TOGGLE'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [ ],
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    toggleIsFetching: false,
    followingInProgress: []

};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case SET_TOGGLE: {
            return{...state, toggleIsFetching: action.toggleIsFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return{...state, followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id=> id != action.userId)
            }
        }
        default:
            return state;
    }
}


export const follow = (userId) => ({type: FOLLOW, userId })
export const unfollow = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
export const setToggle = (toggleIsFetching) => ({type: SET_TOGGLE, toggleIsFetching})
export const toggleFollowingProgress = (isFetching, userId) =>({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setToggle(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(setToggle(false));
    })
}
}

export const onPageChangedThunk = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(setToggle(true));
        dispatch(setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, pageSize).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setToggle(false));
        });
    }
}

export const followUserThunk = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.followUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(follow(userId))
                }
            })
            .then(dispatch(toggleFollowingProgress(false, userId)))
    }
}

export const unFollowUserThunk = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollowUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollow(userId))
                }
            })
            .then(dispatch(toggleFollowingProgress(false, userId)))
    }
}




export default usersReducer;