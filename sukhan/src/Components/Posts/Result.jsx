import React, { useEffect, useState } from 'react'

import "./posts.scss"
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Result = () => {

  const location = useLocation();
  const url = location.pathname;
  const searchData = url.split("/");

    const [data, setData] = useState();
  useEffect(()=>{
    handleSearch()
  }, [searchData[2]])

  
  const handleSearch = async () =>{
    try {
      // Make an API request to update the rating in the database
     const newSearchData = await axios.post('http://localhost:8800/api/users/search', {
        username: searchData[2] ,
        // postid: post.id,
        // userid: post.userid
      });
      setData(newSearchData.data);
    } catch (error) {
      console.error('Error updating rating in the database:', error);
      // Handle the error and provide user feedback
    }
  }



const style = {
    display :"flex",
  }
const pro = {
    height :"40px",
    width:"40px",
    borderRadius: "50%"
}
return (
    <div  style={{ background: 'transparent', boxShadow: 'none' }}>
     Search For {searchData[2]}
      {data &&
        data.map((item) => {
          return (
            <div className='result' style={style}>
            <img className='image' style={pro} src={"./../upload/" + item.profilepic} /> 
            <Link
                  to={`/Profiles/${item.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <span className="userName">{item.username}</span>
                </Link>
            </div>
          );
        })}
    </div>
  );
  
}
export default Result
