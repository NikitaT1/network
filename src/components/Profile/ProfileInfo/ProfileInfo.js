import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/users.png";

const ProfileInfo = ({profile, status, updateStatusThunk, isOwner, savePhotoThunk}) => {
    if (!profile) {
        return <Preloader/>
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
                ava + description
                <ProfileStatusWithHooks status={status} updateStatusThunk={updateStatusThunk}/>
            </div>
        </div>
    )
}

export default ProfileInfo;