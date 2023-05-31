import React from 'react';
import Post from '../Post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import "./posts.scss";

const Posts = React.memo(({ userid }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userid=" + userid).then((res) => {
      return res.data;
    })
  );
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log(data)
  return (
    <div className='posts' style={{ background: "transparent", boxShadow: "none" }}>
      {data && data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
});

export default Posts;
