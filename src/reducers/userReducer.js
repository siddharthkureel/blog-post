
export const signIn = (state = {}, action) => {
    if (action.type === 'SIGN_IN') {
        return { ...state, currentUser: action.payload }
    }
    return state;
}