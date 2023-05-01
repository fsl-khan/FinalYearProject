import React from 'react'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import "./posts.scss"

const Posts = () => {

    const { isLoading, error, data } = useQuery(["posts"],()=>
    makeRequest.get("/posts").then((res) => {
        return res.data
    })
);   

    // console.log(data);

  return (
    <div className='posts' style={{background: "transparent", boxShadow: "none"}}>
        { error ? "Something went wrong!" 
                : isLoading ? "loading" :  data.map(post=>(
            <Post post={post} key={post.id} />)      
        )}

    </div>
  )

}
export default Posts
