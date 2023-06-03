import React, { useContext, useState } from 'react'
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import "./NavBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Context/darkModeContext';
import Home from '../../pages/home/Home';
import RightBar from '../RightBar/RightBar';
import LeftBar from '../LeftBar/LeftBar';
import { AuthContext } from '../../Context/authContext';
// import ProfileModal from './ProfileModal';
import "./ProfileModal.scss"
import { useEffect } from 'react';
import { useRef } from 'react';
// import { logout } from 'path/to/logout';


const NavBar = () => {

  const {toggle , darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  const [profileModal, setProfileModal] = useState(false);

  let menuRef = useRef();

  useEffect(()=>{
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)){
        setProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handler)

    return()=>{
      document.removeEventListener("mousedown", handler);
    }
  })
  
  return ( 
    <div className="navbar">
          <div className="left"> 
          
          <div className="search">
          <SearchOutlinedIcon/> 
          <input type="text" placeholder='search...' />
          </div >
          <div className="NavIcons">
              <Link to={"/"}>
                  <HomeOutlinedIcon  className="NavIconItems" />
              </Link>
              <Link > 
                  <NotificationsOutlinedIcon className="NavIconItems" />
              </Link>
              <Link to={"/books"}>
                  <AutoStoriesOutlinedIcon className="NavIconItems" />
              </Link>
              <Link to={LeftBar}>
                  <Diversity1OutlinedIcon className="NavIconItems" />
              </Link>
              {/* <span onClick={() => localStorage.removeItem("user")} className="label">Sign Out</span> */}
                  </div>                 
          </div>
          <div className="right"> 
                  <div className='user' >
                    <span>{currentUser.username}</span>
                    <img src={"./upload/"+currentUser.profilepic} 
                       onClick={() => {setProfileModal(!profileModal)}}
                    />
                    <div className='profileModal' ref={menuRef}>
        <div className={`drop-down ${profileModal? 'active':'inactive'}`}>
        <ul>
            <DropDownItem text={"My Profile"} />
            <DropDownItem text={"Logout" } />
        </ul>
    </div>
    </div>
                     {/* {profileModal && < ProfileModal setPRofileModal={setProfileModal} />}  */}
                   </div>
                  {darkMode ? ( 
                    <WbSunnyOutlinedIcon onClick={toggle}/>
                  ) : ( 
                  <DarkModeOutlinedIcon onClick={toggle} /> 
                   ) }
                  <Link to="/">
                      <img src="/images/reglogo.png" alt="logo" style={{width: "150px"}} />
                  </Link>
                  
          </div>
    </div>
  )
}
function DropDownItem(props) {
  const handleLogout = () => {
    logout()
      .then(response => {
        localStorage.removeItem("user");
        // Handle successful logout
        console.log("Hogaya hayy Logout", response);
        <Link to="/Login"></Link>
      })
      .catch(error => {
        // Handle logout error
        console.error(error);
      });
  };

  return (
    <>
      <li>
        <a onClick={handleLogout}>
          {props.text}
        </a>
      </li>
    </>
  );
}

export const logout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    return 'Logged Out Successfully!';
  } catch (error) {
    throw new Error('Logout Failed!');
  }
};




export default NavBar
