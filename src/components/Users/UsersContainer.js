import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    followUserThunk,
    unFollowUserThunk,
    getUsers,
    onPageChangedThunk,
    setCurrentPage,
    setToggle,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
} from "../../redux/users-reducer";

import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
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
                  followingInProgress={this.props.followingInProgress}/>
                  </>
}}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        toggleIsFetching: state.usersPage.toggleIsFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps,
    {followUserThunk, unFollowUserThunk, setUsers,
    setCurrentPage, setTotalUsersCount, setToggle,
        toggleFollowingProgress, getUsers, onPageChangedThunk})(UsersContainer);