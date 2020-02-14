
import {getAuthUserDataThunk} from "./auth-reducer";
import {Dispatch} from "redux";

const INITIALIZED_SUCCESS = 'network/app/INITIALIZED_SUCCESS';


interface IInitialState {
    initialized: boolean
}


let initialState: IInitialState = {
    initialized: false
};

const appReducer = (state = initialState, action: IInitializedSuccess) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}


interface IInitializedSuccess {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = () =>
    ({type: INITIALIZED_SUCCESS})

export const initializedApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunk())
        Promise.all([promise])
            .then(()=> {
            dispatch(initializedSuccess())
            }
        )
}


export default appReducer;