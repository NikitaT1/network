import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunk,
    getUserProfileThunk,
    savePhotoThunk,
    saveProfileThunk,
    updateStatusThunk
} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if(!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfileThunk(userId)
        this.props.getStatusThunk(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return (<Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatusThunk={this.props.updateStatusThunk}
                         isOwner={!this.props.match.params.userId}
                         savePhotoThunk={this.props.savePhotoThunk}
                         saveProfileThunk={this.props.saveProfileThunk}/>)
    }
}

let  mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.userId

});

export default compose(
    connect(mapStateToProps, {getUserProfileThunk, getStatusThunk,
        updateStatusThunk, savePhotoThunk, saveProfileThunk}),
    withRouter, withAuthRedirect)(ProfileContainer) ;