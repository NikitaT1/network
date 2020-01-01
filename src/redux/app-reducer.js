
import {getAuthUserDataThunk} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'network/app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}


export const initializedSuccess = () =>
    ({type: INITIALIZED_SUCCESS})

export const initializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunk())
        Promise.all([promise])
            .then(()=> {
            dispatch(initializedSuccess())
            }
        )
}


export default appReducer;