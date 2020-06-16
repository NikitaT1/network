import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect, Route, Switch} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

const UsersContainer = React.lazy(()=> import("./components/Users/UsersContainer"))

const App = (props) => {

    const catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Some error occured")
    }

    useEffect(() => {
        props.initializedApp();
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)

        return function cleanup () {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }

    }, [])


        if (!props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>

                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>

                        <Route path='/users'
                               render={() => {
                                   return <React.Suspense fallback={<div> Loading...</div>}>
                                       <UsersContainer/>
                                   </React.Suspense>
                               }}/>

                        <Route path='/login'
                               render={() => <Login/>}/>

                        <Route exact path='/'
                               render={() => <Redirect to={'/profile'}/>}/>

                        <Route path='*'
                               render={() => <div>404 PAGE NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )

}


let  mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(withRouter, connect(mapStateToProps, {initializedApp}))(App);
