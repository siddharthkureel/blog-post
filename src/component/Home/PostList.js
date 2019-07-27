import React from 'react'
import Post from "./Post";
const PostList = ({posts}) => {
    if(posts===undefined){
        return <div className="lds-dual-ring"></div>
    }else{
    
    return posts.map((post,i)=>{
        return (
        <Post key={i} postId={post._id} post={post.post} name={post.name} date={post.createdAt} userId={post.userId} title={post.title}/>
        )
    })
    }
}

export default PostList
