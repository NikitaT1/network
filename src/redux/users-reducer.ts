import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {photosType} from "../types/types";

const FOLLOW = 'network/users/FOLLOW';
const UNFOLLOW = 'network/users/UNFOLLOW';
const SET_USERS = 'network/users/SET_USERS';
const SET_CURRENT_PAGE = 'network/users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'network/users/SET_TOTAL_COUNT';
const SET_TOGGLE = 'network/users/SET_TOGGLE';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'network/users/TOGGLE_IS_FOLLOWING_PROGRESS';


type UsersType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

type InitialStateType = typeof initialState

let initialState = {
    users: [ ] as Array<UsersType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    toggleIsFetching: false,
    followingInProgress: [] as Array<number>
};

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

type FollowType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): FollowType => ({type: FOLLOW, userId })

type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): UnfollowType => ({type: UNFOLLOW, userId })

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>):SetUsersType => ({type: SET_USERS, users })

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_COUNT, totalCount})

type SetToggleType = {
    type: typeof SET_TOGGLE
    toggleIsFetching: any
}
export const setToggle = (toggleIsFetching: any): SetToggleType => ({type: SET_TOGGLE, toggleIsFetching})

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: any
    userId: number
}
export const toggleFollowingProgress = (isFetching: any, userId: number): ToggleFollowingProgressType =>({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})




export const requestUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(setToggle(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(setToggle(false));
    })
}
}
export const onPageChangedThunk = (pageNumber: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(setToggle(true));
        dispatch(setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, pageSize).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setToggle(false));
        });
    }
}
export const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    (dispatch(toggleFollowingProgress(false, userId)))


}
export const followUserThunk = (userId: number) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.followUser.bind(usersAPI);
        let actionCreator = follow;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}
export const unFollowUserThunk = (userId: number) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
        let actionCreator = unfollow;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}




export default usersReducer;