import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusThunk, getUserProfileThunk, updateStatusThunk} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            debugger
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfileThunk(userId)
        this.props.getStatusThunk(userId)
    }


    render() {
        return (<Profile {...this.props} profile={this.props.profile}
                         status={this.props.status} updateStatusThunk={this.props.updateStatusThunk}/>)
    }
}

let  mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.userId

});

export default compose(
    connect(mapStateToProps, {getUserProfileThunk, getStatusThunk, updateStatusThunk}),
    withRouter, withAuthRedirect)(ProfileContainer) ;