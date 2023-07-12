import "./RightBar.scss"
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import Rate from "../Post/Rate";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const RightBar = () => {
  const { isLoading, error, data } = useQuery(['usersss'], () =>
    makeRequest.get('/users/rank').then((res) => {
      return res.data;
    })
  );
  useEffect(()=>{
    handledata();
  }, [])

  const [data2, setData] = useState();
  const handledata = async () =>{
    try {
      // Make an API request to update the rating in the database
     const res = await axios.get('http://localhost:8800/api/rising',);
      setData(res.data);
    } catch (error) {
      console.error('Error updating rating in the database:', error);
      // Handle the error and provide user feedback
    }
  }

// console.log(data2,"dddd")
  return (
    <div className="rightbar">
      <div className="container">
      <div className="item">
          <span>Ranking </span>
          {isLoading ?  (
            'Loading...'
          ) : ( data && data.map((item , index) => (
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
              <Rate count={5} rating={6-index} color={{ filled: '#f5eb3b', unfilled: '#DCDCDC' }} onRating={null} />
              </div>
            </div>
            )))}
        </div>
        <div className="item">
              <span> Poets Community </span>
              {isLoading ?  (
            'Loading...'
          ) : ( data2 && data2.map((item , index) => (
            <div className="user" key={index}>
              <div className="userinfo">
                <img 
                src={"./upload/"+item.profilepic}  
                alt="Profile"  />
                <span className="userNameClass">{item.username}</span>
              </div>
              <div className="ranking">
              <Rate count={5} rating={item.rated/item.ranking} color={{ filled: '#f5eb3b', unfilled: '#DCDCDC' }} onRating={rate=>setRating(rate)} />
              </div>
            </div>
          )))}
        </div>


      </div>
    </div>
  )
}

export default RightBar
