import { db } from "../connect.js"
// import jwt from "jsonwebtoken"
// import moment from "moment";


export const getBook = (req , res)=>{
    const q = "SELECT posts.*, users.username, users.profilepic FROM posts INNER JOIN users ON users.id = posts.userid WHERE posts.pdf IS NOT NULL";

    db.query(q , (err, data) => {
        return res.json(data);
    })
}