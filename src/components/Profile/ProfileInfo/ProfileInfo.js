import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/users.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatusThunk, isOwner, savePhotoThunk, saveProfileThunk}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData) => {
        saveProfileThunk(formData).then(()=> {
            setEditMode(false)
        })
        //setEditMode(false)
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhotoThunk(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img
                    src='https://i.pinimg.com/originals/b4/e0/23/b4e0239e544cb5c1e2a0fa115c10d0d4.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <div><input type={"file"} onChange={onMainPhotoSelected}/></div>}
                {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> : <ProfileData profile={profile} goToEditMode={goToEditMode}/>}
                <div>
                    <b>Status:</b>
                    <ProfileStatusWithHooks status={status} updateStatusThunk={updateStatusThunk}/>
                </div>


            </div>
        </div>
    )
}


const ProfileData = ({profile, goToEditMode}) => {
    return <div>
        <button onClick={goToEditMode}>edit</button>
        <div>
            <b>{profile.fullName}</b>
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&  <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me:</b>{profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b> {Object.keys(profile.contacts).map(key=> {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div>
        <div className={s.contact}><b>{contactTitle}:</b> {contactValue}</div>
    </div>
}

export default ProfileInfo;