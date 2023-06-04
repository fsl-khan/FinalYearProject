import React from 'react'

import "./posts.scss"

const Result = () => {
const data =[{
    "id": 10,
    "username": "asdf4",
    "email": "asdf4@asd.com",
    "password": "1q2w3e4r",
    "sample": "",
    "coverpic": null,
    "profilepic": null,
    "language": null,
    "nickname": null,
    "bio": null,
    "name": null,
    "usertype": "1",
    "ranking": 1
},
{
    "id": 7,
    "username": "asdf1",
    "email": "asdf1@asd.com",
    "password": "1q2w3e4r",
    "sample": "",
    "coverpic": null,
    "profilepic": null,
    "language": null,
    "nickname": null,
    "bio": null,
    "name": null,
    "usertype": "1",
    "ranking": null
},
{
    "id": 11,
    "username": "fhussain.gbtai23seecs",
    "email": "fsl29nov@gmail.com",
    "password": "1q2w3e4r",
    "sample": "http://localhost:5173/images/pic6.png",
    "coverpic": "1685541516836images (4).jfif",
    "profilepic": "1685541516858images (3).jfif",
    "language": "saqlain",
    "nickname": "lbhioylbhlub",
    "bio": "jbhblkbk",
    "name": null,
    "usertype": "1",
    "ranking": null
},
{
    "id": 13,
    "username": "2019-uobs-502",
    "email": "abc@gmail.com",
    "password": "1q2w3e4r",
    "sample": "C:\\fakepath\\320494155_843450466762940_2081275422845558606_n.jpg",
    "coverpic": "1685696152379320539040_6025352527484102_2340679410022326120_n.jpg",
    "profilepic": "1685696152393329768650_1366896367456515_6325658128819404770_n.png",
    "language": "saqlain",
    "nickname": "saqlain",
    "bio": "saqlain",
    "name": null,
    "usertype": "1",
    "ranking": null
}
]
console.log("ddd")

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
      {data &&
        data.map((item) => {
          return (
            <div className='result' style={style}>
            <img className='image' style={pro} src={"./../upload/" + item.profilepic} /> 
            <span className="userName">{item.username}</span>
            </div>
          );
        })}
    </div>
  );
  
}
export default Result
