import {createSelector} from "reselect";

const getUsers = (state) => {
    return state.usersPage.users
};

export const getUsersSuperSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})

export const getUsersPage = (state) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
};

export const getToggleIsFetching = (state) => {
    return state.usersPage.toggleIsFetching
};

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
};

