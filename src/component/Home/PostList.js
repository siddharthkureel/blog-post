import React from 'react'
import Post from "./Post";
const PostList = ({posts}) => {
 if(posts){
     return posts.map((post,i)=>{
         return (
         <Post key={i} postId={post.id} post={post.post} name={post.name} date={post.date} userId={post.userId}/>
         )
     })
 }
 return<div>Loading</div>
}

export default PostList
