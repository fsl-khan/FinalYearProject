import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships= (req, res)=>{
         const q = `SELECT followeruserid FROM relationships WHERE followeduserid = ?`;
         db.query(q, [req.query.followeduserid] , (err, data)=>{
          if (err) return res.status(500).json(err);
          return res.status(200).json(data.map(relationship=>relationship.followeruserid));
         })
    }


    export const addRelationships= (req , res) => {

      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Not Logged in !!!");
      jwt.verify(token, "secretkey", (err , userinfo)=>{
          if(err) return res.status(403).json("Token not valid !!!");
  
          const q = "INSERT INTO relationships (`followeruserid` , `followeduserid` ) VALUES (?)";
          const VALUES=[
              userinfo.id,
              req.body.userid
          ]
      
          db.query(q, [VALUES] , (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("Following");
          });
      })
  
  };
  

  export const deleteRelationships = (req , res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged in !!!");

    jwt.verify(token, "secretkey", (err , userinfo)=>{
        if(err) return res.status(403).json("Token not valid !!!");

        const q = "DELETE FROM relationships WHERE `followeruserid` = ? AND `followeduserid` = ?";
    
        db.query(q, [userinfo.id, req.query.userid] , (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollow");
        });
    })

};

  