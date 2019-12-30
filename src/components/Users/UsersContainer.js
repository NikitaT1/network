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


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
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

