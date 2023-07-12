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
    console.log(req.body);
    const q =
      "INSERT INTO posts (`desc` , `img` ,`pdf`, `createdAt` , `userid`) VALUES (?)";
      if(req.body.desc === null && (req.body.img === null && req.body.pdf === null || req.body.pdf === '') )
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

export const getfav = (req, res) => {
  // const userid = req.params.userid;
  const q = "SELECT DISTINCT posts.*, users.username, users.profilepic FROM posts INNER JOIN favourates ON posts.id = favourates.postid inner join users on posts.userid = users.id  where  favourates.userid =?;";
  const userid = req.query.id;

  db.query(q  ,[userid] ,(err, data) => {
      if(err) return res.status(500).json(err)
      // const { password , ...info}=data[0];
      return res.json(data);
  })
}

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged in !!!");

  jwt.verify(token, "secretkey", (err, userinfo) => {
    if (err) return res.status(403).json("Token not valid !!!");
    const q = "DELETE FROM posts WHERE `id`=? AND `userid`=?";
    db.query(q, [req.params.id, userinfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Post Deleted!");
      return res.status(403).json("You can only delete your Post!");
    });
  });
};




export const claimPost = (req, res) => {
  const { claimBy, claimAt, post, reference } = req.body;

  const q = "INSERT INTO claims (claimBy, claimAt, Post, Reference) VALUES (?, ?, ?, ?)";
  db.query(q, [req.body.claimBy,req.body.claimAt,req.body.Post,req.body.Reference], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post Claimed!");
  });
};


export const getClaims = (req, res) => {

  const q = "SELECT * FROM sukhandb.claims INNER JOIN posts ON claims.post = posts.id ORDER BY claims.id DESC";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });

};

export const deleteClaimPost = (req, res) => {
    const q = "DELETE posts, comments, favourates FROM posts LEFT JOIN comments ON posts.id = comments.postid LEFT JOIN favourates ON posts.id = favourates.postid WHERE posts.id = ? ";
    const id = req.params.id;
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) 
      return res.status(404).json("Already Deleted!");
      else
      return res.status(200).json("Post Deleted!");
    });
};