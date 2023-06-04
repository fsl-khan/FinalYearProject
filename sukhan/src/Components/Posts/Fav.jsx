import React, { useContext } from 'react'
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import "./posts.scss"
import { AuthContext } from '../../Context/authContext'
import ShowPost from '../Post/ShowPost'

const Fav = () => {
    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["ffff"],()=>
    makeRequest.get("/posts/fav?id="+currentUser.id).then((res) => {
        return res.data
    })
);   
console.log(currentUser.id,"zzzzz",data)


  return (
    <div className='posts' style={{background: "transparent", boxShadow: "none"}}>
        { error ? "Something went wrong!" 
                : isLoading ? "loading" : data && data.map(post=>(
            <ShowPost post={post} key={post.id} rated={0} />)      
        )}
    </div>
  )

}
export default Fav
