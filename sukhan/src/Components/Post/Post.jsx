import "./Post.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { useState } from "react";
import moment from "moment";

const Post = ({post}) => { 

    const [CommentOpen , setCommentOpen] = useState(false)

    // Temporary

    const favorite = true;
    const ranking = false;

  return (
    <div className='Post'>
    <div className="container">
      
      <div className="userBar">
        <div className="userInfo">
        <img src={post.profilepic}/>
        <div className="Uploader">
            <Link to={`/Profile/${post.userid}`} style={{textDecoration:"none" , color: "inherit" , cursor: "pointer"}} >
            <span className="userName">{post.username}</span>
            </Link>
            <span className="date">
                    {moment(post.createdAt).fromNow()}
                </span>
        </div>
        </div>
        <MoreHorizOutlinedIcon />
      </div>
      <div className="contentBar">
        <p>{[post.desc]}</p>
      <img src={"./upload/"+post.img}/>
      </div>
      <div className="reactionBar">
            <div className="item">
                <div className="ranking">
                    <div className="stars">
                {ranking ? 
                <>
                <StarOutlinedIcon />
                <StarOutlinedIcon />
                <StarOutlinedIcon />
                <StarOutlinedIcon />
                <StarOutlinedIcon />
                </> : 
                <> <StarBorderOutlinedIcon/> 
                <StarBorderOutlinedIcon/> 
                <StarBorderOutlinedIcon/> 
                <StarBorderOutlinedIcon/> 
                <StarBorderOutlinedIcon/>
                </>}
                </div>
                <span className="Votes">  24 votes </span> 
                </div>
                
                
                <div className="comment" onClick={()=>setCommentOpen(!CommentOpen)}>
                <ModeCommentOutlinedIcon className="commentIcon"/> 
                <span className="Votes">  Comments </span> 
                
                </div>

                {favorite ? <FavoriteOutlinedIcon style={{color:"red"}} /> 
                                        : 
                            <FavoriteBorderOutlinedIcon />}

                

            </div>

      </div>

      { CommentOpen &&  <Comments postid={post.id}/> }
        
    </div>
    </div> 
  )
}

export default Post
