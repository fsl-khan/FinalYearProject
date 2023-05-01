import { Await, Link } from "react-router-dom"
import Login from "../login/Login"
import "./Register.scss"
import { useState } from "react"
import axios from "axios"

const PoetReg = () => {
    const [inputs , setInputs] = useState({
        username: "",
        email: "",
        password: "",
        sample: "",
    });

    const [err, setErr] = useState(null); 

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
    };
    const handleClick = async e => {
        e.preventDefault()
        try{
             await axios.post("http://localhost:8800/api/auth//register/poet" , inputs);
        }catch (err){
                setErr(err.response.data);
        }
    };
  return (
    <div className="login">
        <div className="card">
            
            <div className="right">
                <h1>Register as Poet</h1>
                <form>
                    <input type="text" placeholder="UserName/نام نام درج کریں "   name="username" onChange={handleChange}/>
                    <input type="text" placeholder="E-mail/ ای-میل درج کریں"  name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password/پاسورڈ درج کریں "  name="password" onChange={handleChange}/>
                    <input type="password" placeholder="ConfirmPassword/پاسورڈ دوبارہ درج کریں"  name="cpassword" onChange={handleChange}/>
                    <input type="file" placeholder="Sample/تصدیق کے لیے اپنا کوئی سا شعر بھیجیں "  name="sample" onChange={handleChange}/>
                </form>
                {err && err}
                <button onClick={handleClick}>Register</button>
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

export default PoetReg
