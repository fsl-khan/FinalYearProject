import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const postLikes = (req, res)=>{
    
         const q = `INSERT INTO favorites (postid, userid) VALUES (?, ?)`;

         db.query('INSERT INTO favorites (postid, userid) VALUES (?, ?)', [req.query.postid, req.user.id], (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error adding post to favorites');
            }
            res.send('Post added to favorites');
          });
          
    }
