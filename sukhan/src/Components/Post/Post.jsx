import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Link, useLocation } from "react-router-dom";
import Comments from "../Comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../Context/authContext";
// import { Document, Page } from "react-pdf";

const Post = ({ post }) => {
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );

  const [CommentOpen, setCommentOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // Temporary

  //PDF VIEW

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentSuccess({numPages}){
  //   setNumPages(numPages)
  // }

  //PDF View

  const ranking = false;

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

  const handleFav = () => {
    mutation.mutate(data && data.includes(currentUser.id));
  };
  let postType = "";
  const location = useLocation();
  const proUrl = location.pathname.split("/");

  if (location.pathname === "/books" ) {
    postType = "pdf";
  }
    else postType = "img";
  return postType === "img" ? (
    (post.img !== null &&  proUrl[1] === "") || proUrl[1] === "Profile" ? (
      <div className="Post">
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
                  {ranking ? (
                    <>
                      <StarOutlinedIcon />
                      <StarOutlinedIcon />
                      <StarOutlinedIcon />
                      <StarOutlinedIcon />
                      <StarOutlinedIcon />
                    </>
                  ) : (
                    <>
                      {" "}
                      <StarBorderOutlinedIcon />
                      <StarBorderOutlinedIcon />
                      <StarBorderOutlinedIcon />
                      <StarBorderOutlinedIcon />
                      <StarBorderOutlinedIcon />
                    </>
                  )}
                </div>
                <span className="Votes"> 24 votes </span>
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
    ) : (
      ""
    )
  ) : post.pdf !== null ? (
    <div className="Post">
      <div className="container">
        <div className="userBar">
          <div className="userInfo">
            <img src={"/upload/" + currentUser.profilepic} />
            <div className="Uploader">
              <Link
                to={`/Profile/${post.userid}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <span className="userName">{currentUser.username}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="contentBar">
          <p>{[post.desc]}</p>
          {post.pdf !== null ? (
            <span>
              <a href={"./upload/" + post.pdf}>{post.pdf}</a>
              {/* {console.log(filesss)}
            <Document file={filesss} onLoadSuccess={onDocumentSuccess}>
              <Page pageNumber={pageNumber} />
            </Document> */}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="reactionBar">
          <div className="item">
            <div className="ranking">
              <div className="stars">
                {ranking ? (
                  <>
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                  </>
                ) : (
                  <>
                    {" "}
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                  </>
                )}
              </div>
              <span className="Votes"> 24 votes </span>
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
  ) : (
    ""
  );
};
export default Post;
