import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { signIn,registerUser } from "./userReducer";
import { showPost, addPost, fetchSinglePost} from './postReducer';
export  const rootReducer = combineReducers({
    signIn,
    registerUser,
    showPost,
    addPost,
    fetchSinglePost,
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
})

