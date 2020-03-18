import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'Morning!', likesCount: 11},
                {id: 3, message: 'Welcome', likesCount: 11},
                {id: 4, message: 'Hi', likesCount: 11}
            ],
            newPostText: 'Hello!'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Joshua'},
                {id: 2, name: 'Elvin'},
                {id: 3, name: 'Jane'},
                {id: 4, name: 'Sam'},
                {id: 5, name: 'Jenkins'},
                {id: 6, name: 'Webster'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hello!'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;  // observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}


export default store;
window.store = store;