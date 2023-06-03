import { Await, Link } from "react-router-dom"
import Login from "../login/Login"
import "./Register.scss"
import { useState } from "react"
import axios from "axios"

const Register = () => {
   
  return (
    <div className="login">
        <div className="card">
            
            <div className="right">
                <h2>Register  <br /> رجسٹر کریں</h2>
                <Link to="/register/poet">
                <button>Register</button>
                </Link>
                <br />
                <br />
                {/* <h2>Register as Member  <br /> بطور عام فرد رجسٹر کریں </h2> */}
                {/* <Link to="/register/member">
                <button>Member</button>
                </Link> */}
              
            </div>
            <div className="left">
                <div className="container">
                    <img src="/images/reglogo.png" alt="logo" />
                <h1>Andaz-e-Sukhan</h1>
                <p>
                ہم یہ پروجیکٹ بلتستان کے ان شاعروں کے نام کرتے ہیں جو بلتی اور اردو دونوں زبانوں میں شاعری کر رہے ہیں۔ شاعری کے ہنر سے ان کی لگن اور متعدد زبانوں میں اظہار خیال کرنے کی ان کی صلاحیت انتہائی قابل تعریف ہے۔ اس پروجیکٹ کے ذریعے، ہم امید کرتے ہیں کہ ان کے ثقافتی ورثے کی تعریف اور تحفظ میں اپنا حصہ ڈالیں گے، اور ہم شاعری کی دنیا میں ان کے تعاون کے لیے ان کی دل کی گہرائیوں سے تعریف کرتے ہیں۔
                </p>
                <span>Already have an account!</span>
                <Link to="/login">
                <button>Login</button>
                </Link>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Register
