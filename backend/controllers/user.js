import { db } from "../connect.js";
import jwt from "jsonwebtoken";



export const getUser = (req, res) => {
    const userid = req.params.userid;
    const q = "SELECT * FROM users WHERE id=?";


    db.query(q , [userid] , (err, data) => {
        if(err) return res.status(500).json(err)
        const { password , ...info}=data[0];
        return res.json(info);
    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "secretkey", (err, userinfo) => {
        if (err) return res.status(403).json("Token not valid !!!");
    
    const q = "UPDATE users SET `nickname`=?, `language`=?, `bio`=?, `coverpic`=?, `profilepic`=? WHERE id=?";
    
    console.log(req.body)

    db.query(q,[
        req.body.nickname,
        req.body.language,
        req.body.bio,
        req.body.coverpic,
        req.body.profilepic,
        userinfo.id
    ],(err,data)=>{
        if (err) res.status(500).json(err)
        if (data && typeof data.affectedRows !== 'undefined' && data.affectedRows > 0) {
            return res.json("Updated!");
          }
        return res.status(403).json("You can update only your post")
    }

    )


    })
    
}