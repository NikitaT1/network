import React from 'react';
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({profile, handleSubmit, error}) => {

    return <form onSubmit={handleSubmit}>
        <button>save</button>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name:</b>
            {createField("Full name", "fullName", Input)}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createField("", "lookingForAJob", Input, [], {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills:</b>
            {createField("My professional skills", "lookingForAJobDescription", Textarea)}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
            {createField("About me", "aboutMe", Textarea)}
        </div>
        <div>
            <b>Contacts</b> {Object.keys(profile.contacts).map(key=> {
            return <div key={key} className={s.contact}>
                <b>{key}: {createField(key, "contacts." + key, Input)} </b>  </div>
        })}
        </div>
    </form>
}

const ProfileDataFormRedux = reduxForm({form: "editProfile"}) (ProfileDataForm)

export default ProfileDataFormRedux