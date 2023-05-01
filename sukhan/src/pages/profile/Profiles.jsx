// import { EmailOutlined, Language, MoreVertOutlined, Place } from "@mui/icons-material"
import { Language,  } from "@mui/icons-material"
import Posts from "../../Components/Posts/Posts"
import "./Profiles.scss"

function Profile  (){
  return (
    <div className="mainProfile">
      <div className="profile">
      <div className="images" >
        <img src="/images/pic2.png" alt="nahi hay" className="profilePic" />
        <img src="/images/logo.png" alt="nahi hay" className="coverPic" />
        {/* <img src={img} alt="" className="profilePic"  /> */} 
        </div>
          <div className="profileDetails">

                <div className="userInfo">
                  <div className="left">
                  <Language />
                  <Language />
                  <Language />
                  <Language />
                  <Language />

                  </div>
                  <div className="center">
                        <span>POet NAme</span>
                        <div className="info">

                          <div className="item">
                            <Language />
                            <span>Poet Main</span>
                          </div>
                          <div className="item">
                            <Language />
                            <span>Poet Language</span>
                          </div>
                          <div className="item">
                            <Language />
                            <span>Details</span>
                          </div>
                          <button>Follow</button>
                          
                        </div>
                  </div>
                  <div className="right">
                  <Language />
                  <Language />
                  <Language />
                  <Language />
                  <Language />

                  </div>
                </div>
            
          </div>
        <Posts />

      
      </div>
    </div>
  )
}

export default Profile
