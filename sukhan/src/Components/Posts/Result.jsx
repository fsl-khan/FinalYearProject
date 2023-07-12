import React, { useEffect, useState } from 'react'

import "./posts.scss"
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Result = () => {

  const location = useLocation();
  const url = location.pathname;
  const searchData = url.split("/");

    const [data, setData] = useState();
    const [data2, setData2] = useState();

  useEffect(()=>{
    handleSearch()
  }, [searchData[2]])

  
  const handleSearch = async () =>{
    try {
      // Make an API request to update the rating in the database
     const newSearchData = await axios.post('http://localhost:8800/api/users/search', {
        username: searchData[2] ,
      });
      setData(newSearchData.data);
      const newSearch = await axios.post('http://localhost:8800/api/users/searchpost', {
        desc: searchData[2] ,
      });
      setData2(newSearch.data);
    } catch (error) {
      console.error('Error ', error);
      // Handle the error and provide user feedback
    }
  }


const style = {
  background: 'transparent', 
  boxShadow: '0px 0px 16px -8px rgba(0, 0, 0, 0.68)', 
  margin: '25px 25px',
  padding: '25px 25px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
  }
const pro = {
    height :"40px",
    width:"40px",
    borderRadius: "50%"
}
return (
  <div style={{ background: 'transparent', 
  boxShadow: '0px 0px 16px -8px rgba(0, 0, 0, 0.68)', 
  margin: '25px 25px',
  padding: '25px 25px',
  height: 'calc(100vh - 70px)'
  }}>

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
        {data2 &&
        data2.map((item) => {
          return (
            <>
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
                  <span>{item.username}</span>
                </Link>
                <br/>
            </div>
            <span  style={{
                    background: 'transparent', 
                    boxShadow: '0px 0px 16px -8px rgba(0, 0, 0, 0.68)', 
                    margin: '25px 25px',
                    padding: '25px 25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}>{item.desc}</span>
            </>
          );
        })}
    </div>
  );
  
}
export default Result
