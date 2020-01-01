import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatusThunk}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img
                    src='https://i.pinimg.com/originals/b4/e0/23/b4e0239e544cb5c1e2a0fa115c10d0d4.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large}/>
                ava + description
                <ProfileStatusWithHooks status={status} updateStatusThunk={updateStatusThunk}/>
            </div>
        </div>
    )
}

export default ProfileInfo;