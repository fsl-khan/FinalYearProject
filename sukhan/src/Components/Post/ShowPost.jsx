import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import { makeRequest } from "../../axios";
import Comments from "../Comments/Comments";
import Rate from "./Rate";
import "./ShowPost.scss"

const ShowPost = ({ post, rated }) => {
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );

  const [totalRate, setTotalRate] = useState();

  const [CommentOpen, setCommentOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const [rating, setRating] = useState(0);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (fav) => {
      if (fav) return makeRequest.delete("/likes?postid=" + post.id);
      return makeRequest.post("/likes", { postid: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  // const pdfPath = "./upload/" + post.pdf;

  const handleRating = async (newRate) => {
    try {
      // Make an API request to update the rating in the database
      await axios.post("http://localhost:8800/api/rising/add", {
        rating: newRate,
        postid: post.id,
        userid: post.userid,
      });
      console.log("Rating updated successfully in the database");
    } catch (error) {
      console.error("Error updating rating in the database:", error);
      // Handle the error and provide user feedback
    }

    // Update the local state with the new rating
    setRating(newRate);
    // {window.location.reload(false)}
  };
  const handleFav = () => {
    mutation.mutate(data && data.includes(currentUser.id));
  };
  let postType = "";
  const location = useLocation();
  const proUrl = location.pathname.split("/");

  if (location.pathname === "/books") {
    postType = "pdf";
  } else postType = "img";

  return (
    <div className="ShowPost">
      <div className="container">
        <div className="userBar">
          <div className="userInfo">
            {proUrl[1] === "Profile" ? (
              <img src={"./../upload/" + post.profilepic} />
            ) : (
              <img src={"./upload/" + post.profilepic} />
            )}
            <div className="Uploader">
              <Link
                to={`/Profile/${post.userid}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <span className="userName">{post.username}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="contentBar">
          <p>{[post.desc]}</p>
          {post.img !== null ? (
            proUrl[1] === "Profile" ? (
              <img src={"./../upload/" + post.img} />
            ) : (
              <img src={"./upload/" + post.img} />
            )
          ) : (
            // post.pdf !== null && proUrl[1] === "Profile"?
            <a href={"./../upload/" + post.pdf}>{post.pdf}</a>
          )}

          {/* <img src={"./upload/" + post.img} /> */}
        </div>
        <div className="reactionBar">
          <div className="item">
            <div className="ranking">
              <div className="stars">
                {/* <Rate  rating={rating} onRating={rate=>setRating(rate)} /> */}
                <Rate
                  count={5}
                  rating={rating}
                  color={{ filled: "#f5eb3b", unfilled: "#DCDCDC" }}
                  onRating={handleRating}
                />
              </div>
              <span className="Votes">
                {parseInt(rated) !== parseInt(rating)
                  ? parseInt(rated) + rating
                  : parseInt(rated)}
              </span>
            </div>

            <div
              className="comment"
              onClick={() => setCommentOpen(!CommentOpen)}
            >
              <ModeCommentOutlinedIcon className="commentIcon" />
              <span className="Votes"> Comments </span>
            </div>

            {isLoading ? (
              "loading"
            ) : data && data.includes(currentUser.id) ? (
              <>
                <>
                  <span>محفوظ ہو گیا</span>{" "}
                </>
                <FavoriteOutlinedIcon
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleFav}
                />
              </>
            ) : (
              <>
                <>
                  <span>محفوظ کریں</span>{" "}
                </>
                <FavoriteBorderOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleFav}
                />
              </>
            )}

            <div className="likes"></div>
          </div>
        </div>

        {CommentOpen && <Comments postid={post.id} />}
      </div>
    </div>
  );
};
export default ShowPost;
