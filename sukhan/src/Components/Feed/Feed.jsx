import Posts from "../Posts/Posts"
import Post from "../Posts/Posts"
import Stories from "../Storiess/Stories"
import Share from "../Upload/Share"
// import BookUploadPopup from "../Upload/UploadPopups/BookUploadPopup"
import "./Feed.scss"

const Feed = () => {
  return (
    <div className="Feeds">
        <Stories />
        <Share />
        <Posts />
      {/* <Profile /> */}


    </div>
  )
}

export default Feed
