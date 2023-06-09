import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";



export const getPosts = (req, res) => {

  const userid = req.query.userid
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged in !!!");

  jwt.verify(token, "secretkey", (err, userinfo) => {
    if (err) return res.status(403).json("Token not valid !!!");

    const q =   
    userid !== "undefined"
    ? `SELECT DISTINCT p.*, u.id AS userid, username, profilepic 
       FROM posts AS p 
       JOIN users AS u ON (u.id = p.userid) 
       WHERE p.userid = ?  
       ORDER BY p.createdAt DESC`
    : `SELECT DISTINCT p.*, u.id AS userid, username, profilepic 
       FROM posts AS p 
       JOIN users AS u ON (u.id = p.userid) 
       LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) 
       WHERE r.followeruserid = ? OR p.userid = ? 
       ORDER BY p.createdAt DESC`;

                const values = userid !=="undefined" ? [userid] : [userinfo.id, userinfo.id]
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);

    });
  });

};
//

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged in !!!");

  jwt.verify(token, "secretkey", (err, userinfo) => {
    if (err) return res.status(403).json("Token not valid !!!");
    const q =
      "INSERT INTO posts (`desc` , `img` ,`pdf`, `createdAt` , `userid`) VALUES (?)";
      if(req.body.desc === null && req.body.img === null && req.body.pdf === null || req.body.pdf === '' )
      {
         return res.status(500).json("Null Post !!!");
      }
      else{
        const VALUES = [
          req.body.desc || null,
          req.body.img || null,
          req.body.pdf || null,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          userinfo.id,
        ];
    
        db.query(q, [VALUES], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Post created!");
        });
      }
    
  });
};
//
