import "./LeftBar.scss";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const LeftBar = () => {
  const { isLoading, error, data } = useQuery(['books'], () =>
    makeRequest.get('/book').then((res) => {
      return res.data;
    })
  );
  // const { isLoading, error, data } = useQuery("userBooks", () =>
  //   makeRequest
  //     .get("/book")
  //     .then((res) => res.data)
  //     .catch((error) => {
  //       throw new Error("Error occurred while fetching books.");   
  //     })
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  return (
    <div className="leftBar">
      <div className="bookContainer">
        <div className="item">
          <span className="LeftTopTitle">BOOKS / مکتوبات </span>
          <div className="user">
            {data &&
              data.map((item, index) => (
                <div key={index}>
                  <div className="userinfo">
                    <img src={"./upload/"+ item.profilepic} alt="User" />
                    <span>{item.username}</span>
                  </div>
                  <div className="book">
                    <a href={"./upload/"+ item.pdf}>
                    <img src="/images/cover.png" alt="Book" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;