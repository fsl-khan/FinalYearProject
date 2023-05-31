import React from 'react'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import "./posts.scss"

const Books = ({userid}) => {


    const { isLoading, error, data } = useQuery(["posts"],()=>
    makeRequest.get("/posts?userid="+userid).then((res) => {
        return res.data
    })
);   
  return (
    <div className='posts' style={{background: "transparent", boxShadow: "none"}}>
        { error ? "Something went wrong!" 
                : isLoading ? "loading" :  data.map(post=>(
            <Post post={post} key={post.id} />)      
        )}
    </div>
  )

}
export default Books
