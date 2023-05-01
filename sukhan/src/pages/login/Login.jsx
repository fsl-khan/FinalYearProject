import { useContext } from "react"
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/authContext"
import "./Login.scss"
import axios from "axios";

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
      const [err, setErr] = useState(null);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const { login } = useContext(AuthContext);
    
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login(inputs);
        //  const res = (await axios.post("http://localhost:8800/api/auth/login" , inputs)).data;
        //  if(res){
           navigate("/")
        //  }
        } catch (err) {
          setErr(err.response.data);
        }
      };
    
  return (
    <div className="login">
        <div className="card">
            
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
            <div className="left">
                <div className="container">
                    <img src="/images/reglogo.png" alt="logo" />
                <h1>Andaz-e-Sukhan</h1>
                <p>
                ہم یہ پروجیکٹ بلتستان کے ان شاعروں کے نام کرتے ہیں جو بلتی اور اردو دونوں زبانوں میں شاعری کر رہے ہیں۔ شاعری کے ہنر سے ان کی لگن اور متعدد زبانوں میں اظہار خیال کرنے کی ان کی صلاحیت انتہائی قابل تعریف ہے۔ اس پروجیکٹ کے ذریعے، ہم امید کرتے ہیں کہ ان کے ثقافتی ورثے کی تعریف اور تحفظ میں اپنا حصہ ڈالیں گے، اور ہم شاعری کی دنیا میں ان کے تعاون کے لیے ان کی دل کی گہرائیوں سے تعریف کرتے ہیں۔
                </p>
                <span>No Account yet!</span>
                <Link to="/register">
                <button>Register</button>
                </Link>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Login

