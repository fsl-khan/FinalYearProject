import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment";


export const getComments = (req , res)=>{

        const q = `Select C.*, u.id AS userid , username, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userid)
                    WHERE c.postid = ? ORDER BY c.createdAt DESC`;
    
        db.query(q, [req.query.postid] , (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });

       
}
export const addComment = (req , res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged in !!!");

    jwt.verify(token, "secretkey", (err , userinfo)=>{
        if(err) return res.status(403).json("Token not valid !!!");

        const q = "INSERT INTO comments (`desc` , `createdAt` , `userid` , `postid`) VALUES (?)";
        const VALUES=[
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userinfo.id,
            req.body.postid
        ]
    
        db.query(q, [VALUES] , (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment done!");
        });
    })

};

export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const commentId = req.params.id;
      const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";
  
      db.query(q, [commentId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Comment has been deleted!");
        return res.status(403).json("You can delete only your comment!");
      });
    });
  };
  