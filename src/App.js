import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

//import UsersContainer from "./components/Users/UsersContainer";

const UsersContainer = React.lazy(()=> import("./components/Users/UsersContainer"))



class App extends React.Component {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
        return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>

                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>

                    <Route path='/users'
                           render={() => {
                               return <React.Suspense fallback={<div> Loading...</div>}>
                                   <UsersContainer/>
                               </React.Suspense>}}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}


let  mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(withRouter, connect(mapStateToProps, {initializedApp}))(App);
