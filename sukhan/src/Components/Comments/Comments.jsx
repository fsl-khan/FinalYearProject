import { useContext, useState } from "react";
import "./Comments.scss";
import { AuthContext } from "../../Context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postid }) => {
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
  );


  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postid });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="writeComment">
        <img src={currentUser.profilePic} />
        <input
          type="Text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>SEND</button>
      </div>

      {isLoading
        ? "loading..."
        : data.map((comments , index) => (
            <div className="comment" key={index}>
              <img src={comments.profilepic} />
              <div className="info">
                <span>{comments.username}</span>
                <p>{comments.desc}</p>
              </div>
              <span className="date">
                {moment(comments.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
