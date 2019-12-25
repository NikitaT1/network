
export const getUsers = (state) => {
    return state.usersPage.users
};

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

