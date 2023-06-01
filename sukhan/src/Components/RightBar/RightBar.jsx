import "./RightBar.scss"
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import Rate from "../Post/Rate";
import { useState } from "react";


const RightBar = () => {
  const { isLoading, error, data } = useQuery(['usersss'], () =>
    makeRequest.get('/rising').then((res) => {
      return res.data;
    })
  );
  const [rating, setRating] = useState([]);

  return (
    <div className="rightbar">
      <div className="container">
      <div className="item">
          <span>Ranking / درجہ بندی </span>
          {isLoading ?  (
            'Loading...'
          ) : ( data && data.map((item , index) => (
            <div className="user" key={index}>
              <div className="userinfo">
                <img 
                src={"./upload/"+item.profilepic} 
                alt="Profile"  />
                <span className="userNameClass" >{item.username}</span>
              </div>
              <div className="ranking">
              <Rate count={5} rating={rating} color={{ filled: '#f5eb3b', unfilled: '#DCDCDC' }} onRating={rate=>setRating(rate)} />
              </div>
            </div>
            )))}
        </div>



        <div className="item">
              <span>Raising Stars / ابھرتے ستارے </span>
              {isLoading ?  (
            'Loading...'
          ) : ( data && data.map((item , index) => (
            <div className="user" key={index}>
              <div className="userinfo">
                <img 
                src={"./upload/"+item.profilepic}  
                alt="Profile"  />
                <span className="userNameClass">{item.username}</span>
              </div>
              <div className="ranking">
                <StarOutlineOutlinedIcon />
                <StarOutlineOutlinedIcon />
                <StarOutlineOutlinedIcon />
                <StarOutlineOutlinedIcon />
                <StarOutlineOutlinedIcon />
              </div>
            </div>
          )))}
        </div>


      </div>
    </div>
  )
}

export default RightBar
