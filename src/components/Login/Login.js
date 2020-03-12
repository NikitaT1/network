import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {LoginThunk, LogOutThunk} from "../../redux/auth-reducer";
import style from "../common/FormsControls/FormsControls.module.css"

const maxLength = maxLengthCreator(30)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit} >
            {createField("Email", "email", Input, [requiredField])}
            {createField("Password", "password", Input, [requiredField], {type:"password"})}
            {createField(null,"rememberMe", Input, null,{type:"checkbox"})}

            { error && <div className={style.formSummaryError}>
                {error}
            </div>}
            {captchaUrl && <img src={captchaUrl}/>}
            <div>
            {captchaUrl &&  createField("SymbolsFromImage", "captcha", Input, [requiredField])}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const Login = (props) => {
    const onSubmit = (formData) => {
        props.LoginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)
    return <div>
    <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        <button onClick={props.LogOutThunk}>Logout</button>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {LoginThunk, LogOutThunk}) (Login);
