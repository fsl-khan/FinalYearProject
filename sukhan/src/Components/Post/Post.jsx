import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import { makeRequest } from "../../axios";
import Comments from "../Comments/Comments";
import "./Post.scss";
import Rate from "./Rate";
import BookView from "../Posts/BookView";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import React from "react";

const Post = ({ post, rated }) => {
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );
  const [totalRate, setTotalRate] = useState();

  const [CommentOpen, setCommentOpen] = useState(false);

  const [MenuOpen, setMenuOpen] = useState(false);

  const [claim, setClaim] = useState(false);
  const [ModalData, setData] = useState("");
  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRequest = async () => {
    const claimAt = post.username;
    const username = currentUser.username;
    console.log(post.id)
    try {
      await axios.post("http://localhost:8800/api/posts/claim", {
        claimBy: username,
        claimAt: claimAt,
        Post: post.id,
        Reference: ModalData,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  const [rating, setRating] = useState(0);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (fav) => {
      if (fav) return makeRequest.delete("/likes?postid=" + post.id);
      return makeRequest.post("/likes", { postid: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleRating = async (newRate) => {
    try {
      await axios.post("http://localhost:8800/api/rising/add", {
        rating: newRate,
        postid: post.id,
        userid: currentUser.id,
      });
      console.log("Rating updated successfully in the database");
    } catch (error) {
      console.error("Error updating rating in the database:", error);
    }

    setRating(newRate);
  };
  const handleFav = () => {
    mutation.mutate(data && data.includes(currentUser.id));
  };

  const deleteMutation = useMutation(
    (postid) => {
      return makeRequest.delete("/posts/" + postid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  let postType = "";
  const location = useLocation();
  const proUrl = location.pathname.split("/");

  if (location.pathname === "/books") {
    postType = "pdf";
  } else postType = "img";

  return postType === "img" ? (
    ((post.img !== null || post.desc !== null) && proUrl[1] === "") ||
    proUrl[1] === "Profile" ? (
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
            <div className="more">
              <MoreHorizOutlinedIcon onClick={() => setMenuOpen(!MenuOpen)} />
              {MenuOpen &&
                (post.userid === currentUser.id ? (
                  <button onClick={handleDelete}>Delete</button>
                ) : (
                  ""
                ))}
              {currentUser.usertype === "0" ? (
                ""
              ) : (
                <div className="request">
                  <InfoRoundedIcon
                    onClick={handleOpen}
                    style={{ cursor: "pointer" }}
                  />
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <TextareaAutosize
                          value={ModalData}
                          onChange={(e) => setData(e.target.value)}
                        />
                        <Button onClick={handleRequest}>Submit</Button>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              )}
            </div>
          </div>
          <div className="contentBar">
            <pre>{post.desc}</pre>
            {post.img !== null ? (
              proUrl[1] === "Profile" ? (
                <img src={"./../upload/" + post.img} />
              ) : (
                <img src={"./upload/" + post.img} />
              )
            ) : (
              ""
            )}
          </div>
          <div className="reactionBar">
            <div className="item">
              <div className="ranking">
                <div className="stars">
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
                    <span>Favorite</span>{" "}
                  </>
                  <FavoriteOutlinedIcon
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={handleFav}
                  />
                </>
              ) : (
                <>
                  <>
                    <span> Favorite</span>{" "}
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
            <img src={"/upload/" + post.profilepic} />
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
          {post.pdf !== null ? (
            <span>
              <BookView pdfUrl={"./../upload/" + post.pdf} />
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="reactionBar">
          <div className="item">
            <div className="ranking">
              <div className="stars">
                <Rate
                  count={5}
                  rating={rating}
                  color={{ filled: "#f5eb3b", unfilled: "#DCDCDC" }}
                  onRating={(rate) => setRating(rate)}
                />
              </div>
              <span className="Votes"> {rating} </span>
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
                  <span>Favorite</span>{" "}
                </>
                <FavoriteOutlinedIcon
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleFav}
                />
              </>
            ) : (
              <>
                <>
                  <span>Favorite</span>{" "}
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