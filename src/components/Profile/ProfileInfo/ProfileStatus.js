import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';



class ProfileStatus extends React.Component {

    state={
        editMode: false
    }

    activateEditMode () {
        this.setState( {
                editMode: true
        })
    }

    deactivateEditMode () {
        this.setState( {
                editMode: false
            })
    }

 render() {
     return (
         <>
             {!this.state.editMode ?
                 <div>
                 <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
             </div> :
             <div>
                 <input onBlur={this.deactivateEditMode.bind(this)} value={this.props.status} autoFocus={true}/>
             </div>
                 }
         </>
     )
 }


};

export default ProfileStatus;