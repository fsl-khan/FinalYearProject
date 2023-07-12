import React, { useEffect, useState } from "react";
import "./Poets.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Poets = () => {
    const [data, setData] = useState();
  
    const handlePoets = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users/poets");
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      handlePoets();
    }, []);
  
    // console.log("data", data);
  
    return (
    //   <div className="">
    //     {data &&
    //       data.map((item) => {
    //         return <span key={item.id}>{item.username} </span>;
    //       })}
    //   </div>
    <div className="parent">
    <div className="container">
      <h2>Registered Poets</h2>
      <div className="item">
      {( data && data.map((item , index) => (
        <div className="user" key={index}>
          <div className="userinfo">
            <img 
            src={"./upload/"+item.profilepic} 
            alt="Profile"  />
             <Link
            to={`/Profile/${item.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <span className="userNameClass">{item.username}</span>
          </Link>
          </div>
          <div className="ranking">
              {/* <Rate count={5} rating={6-index} color={{ filled: '#f5eb3b', unfilled: '#DCDCDC' }} onRating={null} /> */}
              </div>
        </div>
        )))}
    </div>
    </div>
    </div>
    );
  };
  

  

export default Poets;
