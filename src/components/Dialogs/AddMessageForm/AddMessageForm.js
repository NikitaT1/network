import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";

const maxLength = maxLengthCreator(10)

export const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="NewMessageBody" placeholder="Enter your message"
                       validate={[requiredField, maxLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);