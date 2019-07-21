import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { signIn } from "./userReducer";
import { showPost, addPost, fetchSinglePost} from './postReducer';
import { likePost,renderLikes } from './likeReducer';
export  const rootReducer = combineReducers({
    signIn,
    showPost,
    addPost,
    fetchSinglePost,
    renderLikes,
    likePost,
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
})

