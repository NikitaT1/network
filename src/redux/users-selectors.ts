import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
};

export const getUsersSuperSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})

export const getUsersPage = (state: AppStateType) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
};

export const getToggleIsFetching = (state: AppStateType) => {
    return state.usersPage.toggleIsFetching
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
};

