export const likePost = (state={},action)=>{
    if (action.type ==='LIKE_POST'){
        return { ...state, likePost: action.payload}
    }
    return state
}
export const renderLikes = (state = {}, action) => {
    if (action.type === 'READ_LIKE') {
        return { ...state, readLike: action.payload }
    }
    return state
}