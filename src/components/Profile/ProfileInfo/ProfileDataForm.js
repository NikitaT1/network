import React from 'react';
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({profile, handleSubmit}) => {

    return <form onSubmit={handleSubmit}>
        <button>save</button>
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
            <b>Contacts</b>
        </div>
    </form>
}

const ProfileDataFormRedux = reduxForm({form: 'editProfile'}) (ProfileDataForm)

export default ProfileDataFormRedux