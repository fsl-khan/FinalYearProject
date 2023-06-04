import { useContext } from "react"
import Posts from "../Posts/Posts"
import Post from "../Posts/Posts"
import Stories from "../Storiess/Stories"
import Share from "../Upload/Share"
// import BookUploadPopup from "../Upload/UploadPopups/BookUploadPopup"
import "./Feed.scss"
import { AuthContext } from "../../Context/authContext"



const Feed = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="Feeds">
        {/* <Stories /> */}
        {currentUser.usertype === "0"?"":
        <Share />  }
        <Posts />
      {/* <Profile /> */}


    </div>
  )
}

export default Feed
