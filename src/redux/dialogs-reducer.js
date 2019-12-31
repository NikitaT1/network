const SEND_MESSAGE = 'network/dialogs/SEND_MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.text}]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (text) => ({type: SEND_MESSAGE, text: text})

export default dialogsReducer;