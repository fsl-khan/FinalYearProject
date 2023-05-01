// import { useContext } from "react"
import { Link } from "react-router-dom"
// import { AuthContext } from "../../Context/authContext"
import "./AdminLogin.scss"

const AdminLogin = () => {

//    const {loginF} = useContext(AuthContext);

//   const handleLogin = () => {
    
//     loginF(

//         setCurrentUser({
//             id: 1,
//             name: "Poet Name",
//             profilePic: "/images/user.png",
//         })
//     ); 
//   }

  return (
    <div className="login">
        <div className="card">
            
            <div className="right">
                <h1>Admin Login</h1>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                </form>
                <button  >Login</button>
            </div>
            <div className="left">
                <div className="container">
                    <img src="/images/reglogo.png" alt="logo" />
                <h1>Andaz-e-Sukhan</h1>
                <p>A special platform only for the poets A special platform only for the 
                    poets A special platforplatform only for the poets A special platform only for the 
                    poets A special platforplatform only for the poets A special platform only for the 
                    poets A special platform only for the A special platform 
                    only for the poets poets A special platform only for the poets</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin

// onClick={handleLogin}