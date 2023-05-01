import React, { useContext } from 'react'
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


const NavBar = () => {

  const {toggle , darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  
  return ( 
    <div className="navbar">
          <div className="left"> 
          
          <div className="search">
          <SearchOutlinedIcon/> 
          <input type="text" placeholder='search...' />
          </div >
          <div className="NavIcons">
              <Link to={Home}>
                  <HomeOutlinedIcon className="NavIconItems" />
              </Link>
              <Link>
                  <NotificationsOutlinedIcon className="NavIconItems" />
              </Link>
              <Link to={RightBar}>
                  <AutoStoriesOutlinedIcon className="NavIconItems" />
              </Link>
              <Link to={LeftBar}>
                  <Diversity1OutlinedIcon className="NavIconItems" />
              </Link>


              <span onClick={() => localStorage.removeItem("user")} className="label">Sign Out</span>


                  </div>                 
          </div>
          <div className="right"> 
                  <div className='user'>
                    <span>{currentUser.username}</span>
                    <img src={currentUser.profilepic} />
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

export default NavBar
