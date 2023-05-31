import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLike = (req, res)=>{
    
         const q = `SELECT userid FROM favourates WHERE postid = ?`;
         db.query(q, [req.query.postid] , (err, data)=>{
          if (err) return res.status(500).json(err);
          return res.status(200).json(data.map(like=>like.userid));
         })
    }


    export const addLike = (req , res) => {

      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Not Logged in !!!");
  
      jwt.verify(token, "secretkey", (err , userinfo)=>{
          if(err) return res.status(403).json("Token not valid !!!");
  
          const q = "INSERT INTO favourates (`userid` , `postid` ) VALUES (?)";
          const VALUES=[
              userinfo.id,
              req.body.postid
          ]
      
          db.query(q, [VALUES] , (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("added to fav !");
          });
      })
  
  };
  

  export const deleteLike = (req , res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged in !!!");

    jwt.verify(token, "secretkey", (err , userinfo)=>{
        if(err) return res.status(403).json("Token not valid !!!");

        const q = "DELETE FROM favourates WHERE `userid` = ? AND `postid` = ?";
        const VALUES=[
            userinfo.id,
            req.body.postid
        ]
    
        db.query(q, [userinfo.id, req.query.postid] , (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Removed from fav !");
        });
    })

};

  