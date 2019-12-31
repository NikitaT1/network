import React, {PureComponent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, Form, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

class MyPosts extends PureComponent {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state
    }

    render() {
        let postsElements =
            this.props.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);

        let newPostElement = React.createRef();

        let onAddPost = (values) => {
            this.props.addPost(values.NewPostBody);
        }


        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <AddPostFromRedux onSubmit={onAddPost}/>
                <div className={s.posts}>
                    { postsElements }
                </div>
            </div>
        )
    }



}

const maxLength = maxLengthCreator(5)

const AddPostForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                    <Field
                    component={Textarea} name="NewPostBody" placeholder="Enter your post"
                    validate={[requiredField, maxLength]}
                    />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </Form>
    )
}

const AddPostFromRedux = reduxForm({form: "addMyPostForm"})(AddPostForm)

export default MyPosts;