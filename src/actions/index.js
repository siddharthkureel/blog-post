import history from '../history';
import database from "../api/database";
//----------------------Post CRUD ---------------------//
export const post=(text)=>{
   return{
      type:'POST',
      payload:text
   }
}
export const addPost=(data)=>async (dispatch)=>{
  const response = await database.post('/posts',data)
  dispatch({
     type:'ADD_POST',
     payload:response.data
  })
  dispatch(showPost())
}
export const deletePost=(id)=>async dispatch=>{
   const response= await database.delete(`/posts/${id}`)
   dispatch({
      type:'DELETE_POST',
      payload:response.data
   })
   dispatch(showPost())
}
export const editPost=(data,id)=>async dispatch=>{
   const response = await database.patch(`/posts/${id}`,data)
   dispatch({
      type:'EDIT_POST',
      payload:response.data
   })
   dispatch(showPost())
}
export const fetchSinglePost=(id)=>async dispatch=>{
   const response = await database.get(`/posts/${id}`)
   dispatch({
      type: 'FETCH_SINGLE_POST',
      payload: response.data
   })
}
export const showPost=()=> async dispatch=>{
   const response = await database.get('/posts');
   dispatch({
      type:'SHOW_POSTS',
      payload:response.data
   })
}
//---------------------Users-------------------------//
export const registerUser=(formValues)=>async ()=>{
   await database.post('/users',formValues)
  
   history.push('/signin');
}
export const signIn=(formValues)=> async dispatch=>{

   const response = await database.post('/login',formValues)
   
    dispatch({
      type:'SIGN_IN',payload:response.data.user
   })
   history.push('/home')
}
//---------------------Likes------------------------//
export const likePost=(postId,userId,userName)=>async dispatch=>{
   const response = await database.post(`/posts/likes`, {userId,userName,postId})
   dispatch({
      type:'LIKE_POST',
      payload:response.data
   })
}  
export const renderLikes = (postId) =>async dispatch =>{
   const response = await database.get(`/renderlike/${postId}`)
   dispatch({
      type: 'READ_LIKE',
      payload: response.data
   })
}