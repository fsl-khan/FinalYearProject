import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import "./posts.scss";
import axios from 'axios';

const Posts = React.memo(({ userid }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userid=" + userid).then((res) => {
      return res.data;
    })
  );
   
  const [data1, setData] = useState();

  const getUser = async () => {
    const response = await axios.get("http://localhost:8800/api/rising/rate");
    const data = response.data;
    setData(data);
  };
  
  useEffect(() => {
    getUser();
  }, []);



  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data1)
  return (
    <div className='posts' style={{ background: "transparent", boxShadow: "none" }}>
{data && data1 && data.map((post, index) => (
  <Post
    post={post}
    key={post.id}
    rated={data1.find((item) => item.postid === post.id)?.rating || 0}
  />
))}


    </div>
  );
});

export default Posts;
