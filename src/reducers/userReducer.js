export const registerUser=( state = {},action)=>{
    if (action.type ==='REGISTER_USER'){
        return {...state,currentUser:action.payload};
    }
    return state;
}
export const signIn = (state = {}, action) => {
    if (action.type === 'SIGN_IN') {
        return { ...state, currentUser: action.payload }
    }
    return state;
}