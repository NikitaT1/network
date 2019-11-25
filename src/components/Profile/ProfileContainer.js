import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunk} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfileThunk(userId)
    }


    render() {

        return (<Profile {...this.props} profile={this.props.profile}/>)
    }
}

    let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

/*let  mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

let AuthRedirectComponentConnected = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)*/

let  mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter (AuthRedirectComponent)

export default connect (mapStateToProps, {getUserProfileThunk}) (WithUrlDataContainerComponent);