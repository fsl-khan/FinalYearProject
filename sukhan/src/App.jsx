import React, { useContext } from 'react'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { createBrowserRouter,
         RouterProvider,
         Route, 
         Outlet,
         Navigate} from 'react-router-dom'
import LeftBar from './Components/LeftBar/LeftBar'
import RightBar from './Components/RightBar/RightBar'
import NavBar from './Components/NavBar/NavBar'
import Home from './pages/home/Home'
// import Profile from './pages/Profile/Profile'
import "./style.scss"
import { DarkModeContext } from './Context/darkModeContext'
import { AuthContext } from './Context/authContext'
import Profile from './pages/profile/Profiles'
import AdminPage from './pages/Admin/Admin/AdminPage'
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin'
import MemberReg from './pages/register/MemberReg'
import PoetReg from './pages/register/PoetReg'

import {  useQuery,QueryClient,   QueryClientProvider } from "@tanstack/react-query";
import Books from './Components/Posts/Books'
import Result from './Components/Posts/Result'
import Profile2 from './pages/profile/Profile'

function App () { 
 

  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient();


 
  const Layout=()=>{
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar/>
        <div style={{display:"flex"}}>
          <LeftBar/>
          <div style={{flex:"6"}}>
          <Outlet/>
          </div>
          <RightBar/>
        </div>

      </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }
      return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute> 
          <Layout/> 
         </ProtectedRoute> 
            ) ,
      children:[{
        path: "/",
        element: <Home/>,
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/profile2/:id",
        element: <Profile2 />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/search/:username",
        element: <Result />
      }
    ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/admin",
      element: <AdminPage />
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />
    },
    {
      path: "/register/member",
      element: <MemberReg />
    },
    {
      path: "/register/poet",
      element: <PoetReg />
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )

}

export default App
