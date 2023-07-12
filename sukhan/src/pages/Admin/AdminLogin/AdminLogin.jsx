import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.scss";
import { AuthContext } from "../../../Context/authContext";

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // await login(inputs);
      navigate("/admin");
    } catch (err) {
      if (err.response) {
        // Error response received from the API
        setErr(err.response.data);
      } else {
        // Other types of errors
        setErr("An error occurred");
      }
    }
  };
  

  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1>Admin Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </form>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="left">
          <div className="container">
            <img src="/images/reglogo.png" alt="logo" />
            <h1>Andaz-e-Sukhan</h1>
            <p>
            ہم یہ پروجیکٹ بلتستان کے ان شاعروں کے نام کرتے ہیں جو بلتی اور اردو دونوں زبانوں میں شاعری کر رہے ہیں۔ شاعری کے ہنر سے ان کی لگن اور متعدد زبانوں میں اظہار خیال کرنے کی ان کی صلاحیت انتہائی قابل تعریف ہے۔ اس پروجیکٹ کے ذریعے، ہم امید کرتے ہیں کہ ان کے ثقافتی ورثے کی تعریف اور تحفظ میں اپنا حصہ ڈالیں گے، اور ہم شاعری کی دنیا میں ان کے تعاون کے لیے ان کی دل کی گہرائیوں سے تعریف کرتے ہیں۔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
