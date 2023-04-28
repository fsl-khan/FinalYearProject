import  json  from "express";
import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import  Jwt  from "jsonwebtoken";
// now you can use comparePassword instead of compareSync


export const register =(req, res) => {
    // chek k user available
    console.log(req.body)

    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q,[req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User Already Exists ...!!")
        //create naya user
        // hash password   
        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(req.body.password , salt)

        const q = "INSERT INTO users (`username` , `email` , `password` , `sample` ) VALUE (?)";

        const values= [
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.sample,
        ];
        db.query (q , [values] , (err , data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created successfully ...!!")
        });

    });

};

// MEMber Registratoin

export const registerMember =(req, res) => {

    // chek k user available
    console.log(req.body)

    const q = "SELECT * FROM member WHERE memberemail = ?"

    db.query(q,[req.body.memberemail], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User Already Exists ...!!")

        //create naya user
        // hash password
    
        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(req.body.memberpassword , salt)

        const q = "INSERT INTO member (`membername` , `memberemail` , `memberpassword`) VALUE (?)";

        const values= [
            req.body.membername,
            req.body.memberemail,
            req.body.memberpassword,
            // req.body.sample,
        ];
        db.query (q , [values] , (err , data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created successfully ...!!")
        });

    });

};
 
// MEmber Registration


export const login =(req, res) => {
        const q = "SELECT * FROM users where email = ?"
        db.query(q,[req.body.email], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length===0) return res.status(404).json("User not found!");
            
            // const checkPassword = bcrypt.compare(req.body.password, data[0].password);
            const checkPassword = req.body.password===  data[0].password;

            if (!checkPassword) return res.status(400).json("Wrong password / username !");

            else{
    
                const token = Jwt.sign({id:data[0].id}, "secretkey");
                
                const  {password, ...others} = data[0];
                
                res.cookie("accessToken", token, {
                    httpOnly: true,
                }).status(200).json(others);
            }
            });
}
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
      secure: true,
      sameSite: "none"
    }).status(200).json("Logged Out Success !");
  };
  