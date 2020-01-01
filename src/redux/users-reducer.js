import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'network/users/FOLLOW';
const UNFOLLOW = 'network/users/UNFOLLOW';
const SET_USERS = 'network/users/SET_USERS';
const SET_CURRENT_PAGE = 'network/users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'network/users/SET_TOTAL_COUNT';
const SET_TOGGLE = 'network/users/SET_TOGGLE'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'network/users/TOGGLE_IS_FOLLOWING_PROGRESS'

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
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
   /*             users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })*/
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
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

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    (dispatch(toggleFollowingProgress(false, userId)))


}

export const followUserThunk = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.followUser.bind(usersAPI);
        let actionCreator = follow;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const unFollowUserThunk = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
        let actionCreator = unfollow;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}




export default usersReducer;