import history from '../history';
import database from "../api/database";

export const post=(text)=>{
   return{
      type:'POST',
      payload:text
   }
}

export const addPost=(data)=>async (dispatch,getState)=>{
  const response = await database.post('/posts',{...data,id:Math.random()})
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

export const registerUser=(formValues)=>async dispatch=>{
   const response = await database.post('/users',{...formValues,id:Math.random()})
   dispatch({
      type:'REGISTER_USER',payload:response.data
   })
   history.push('/signin');
}
export const signIn=(formValues)=> async dispatch=>{
   const response = await database.get('users')
   const usersList=response.data;
   const currentUser= usersList.filter(a=>{
      if(a.email===formValues.email && a.password===formValues.password){
         return {...a}
      }
      return null;
   })
   dispatch({
      type:'SIGN_IN',payload:currentUser[0]
   })
   history.push('/')
}
