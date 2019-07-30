import history from '../history';
import database from "../api/database";

export const loadUser = () => async dispatch=>{
   try {
      const token = localStorage.getItem('jwtToken');
      if(token==='' || !token){
         return
      }
      const userInfo = await database.get('/userinfo', { headers: { "Authorization": `Bearer ${token}` } })
      dispatch({
            type: 'SIGN_IN',
            payload: userInfo.data
         })
   } catch (error) {
      
   }
}
//----------------------Post CRUD ---------------------//
export const showPost = () => async dispatch=>{
   const posts = await database.get('/posts');
   const response = posts.data.reverse()
   dispatch({
      type:'SHOW_POSTS',
      payload:response
   })
}

export const post =(text)=>{
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
//---------------------Users-------------------------//
export const registerUser=(formValues)=>async (dispatch)=>{
   try {
     
      const response = await database.post('/users',formValues)
      localStorage.setItem('jwtToken', response.data.token);
      dispatch({
         type: 'SIGN_IN', payload: response.data.user
      })
      history.push('/home')
   } catch (error) {
      alert('email already taken')
   }
}
export const signIn=(formValues)=> async dispatch=>{
   try {     
      const response = await database.post('/login',formValues)
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('loggedIn','true')
      dispatch({
         type:'SIGN_IN',payload:response.data.user
      })
      history.push('/home')
   } catch (error) {
      alert('incorrect username or password')
   }
}
export const logoutUser = () => async (dispatch) => {
   try {
      const token = localStorage.getItem('jwtToken');
      await database.get('/logout',{ headers: { "Authorization": `Bearer ${token}` } })
      dispatch({ type: 'SIGN_IN' })
   } catch (error) {
      
   } finally {
     localStorage.removeItem('jwtToken');
   }
      
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