import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    followUserThunk,
    unFollowUserThunk,
    requestUsers,
    onPageChangedThunk,
    setCurrentPage,
    setToggle,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
} from "../../redux/users-reducer";

import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getToggleIsFetching,
    getTotalUsersCount,
    getUsers,
    getUsersPage, getUsersSuperSelector
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../types/types";


type PropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    onPageChanged: (pageNumber: number) => void
    onPageChangedThunk: (pageNumber: number, pageSize: number) => void

    followUserThunk: any
    unFollowUserThunk: any
    toggleFollowingProgress: any
    followingInProgress: any
    
    totalUsersCount: any
    currentPage: number
    pageSize: number
    pageNumber: number
    toggleIsFetching: boolean
    users: Array<UserType>
    pages: number



}

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.onPageChangedThunk(pageNumber, this.props.pageSize);
    }


render () { 
    return <>
        <div>
            {this.props.toggleIsFetching ? <Preloader/> : null }
        </div>
        <Users totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  followUserThunk={this.props.followUserThunk}
                  unFollowUserThunk={this.props.unFollowUserThunk}
                  toggleFollowingProgress={this.props.toggleFollowingProgress}
                  followingInProgress={this.props.followingInProgress}
        pages={this.props.pages}/>
                  </>
}}


let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSuperSelector (state),
        pageSize: getUsersPage(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        toggleIsFetching: getToggleIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(connect(mapStateToProps,
    {followUserThunk, unFollowUserThunk, setUsers,
    setCurrentPage, setTotalUsersCount, setToggle,
        toggleFollowingProgress, requestUsers, onPageChangedThunk}), withAuthRedirect)(UsersContainer);

