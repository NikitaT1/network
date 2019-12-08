import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {LoginThunk, LogOutThunk} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const maxLength = maxLengthCreator(30)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"login"} name={"email"} component={Input}
                       validate={[requiredField, maxLength]}/>
            </div>
            <div>
                <Field placeholder={"password"} name={"password"} type={"password"} component={"input"}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.LoginThunk(formData.email, formData.password, formData.rememberMe,)
    }

    /*if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }*/

    return <div>
    <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        <button onClick={props.LogOutThunk}>Logout</button>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {LoginThunk, LogOutThunk}) (Login);
