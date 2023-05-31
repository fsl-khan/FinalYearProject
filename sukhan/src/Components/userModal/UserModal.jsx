import React, { useContext, useState } from "react";
import "./userModal.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/authContext";

const UserModal = ({ setOpenUserModal, user }) => {
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [text, setText] = useState({
    nickname: "",
    bio: "",
    language: "",
    username: "",
  });
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState({
    nickname: text.nickname,
    bio: text.bio,
    language: text.language,
    username: text.username,
    coverpic: coverUrl,
    profilepic: profileUrl,
    id: currentUser.id,
    email: currentUser.email,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", text);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const handleClick = async (e) => {
    e.preventDefault();

    setCoverUrl(user.coverpic);
    setProfileUrl(user.profilepic);

    let covUrl=user.coverpic, proUrl=user.profilepic;
    covUrl = cover ? await upload(cover) : user.coverpic;
    proUrl = profile ? await upload(profile) : user.profilepic;



      data.nickname= text.nickname;
      data.bio= text.bio;
      data.language= text.language;
      data.username= text.username;
      data.coverpic= covUrl;
      data.profilepic= proUrl;
      data.id= currentUser.id;
      data.email= currentUser.email;
    
  
    

    mutation.mutate({ ...text, coverpic: covUrl, profilepic: proUrl });

    setOpenUserModal(false);
  };

  const mutation = useMutation(
    (user) => {
      // const dataArray = Object.entries(user).map(([key, value]) => value);

      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
        console.log("updated", data);
        localStorage.setItem("user", JSON.stringify(data));
      },
    }
  );
  return (
    <div className="userModal">
      UserModal
      <form action="#"className="form">
      <button className="close" onClick={() => setOpenUserModal(false)}>x</button>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} className="picInput"/>
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} className="picInput" />
        <input type="text" name="nickname" placeholder="nickname" onChange={handleChange} className="input" />
        <input type="text" name="bio" placeholder="bio" onChange={handleChange} className="input"  />
        <input type="text" name="language" placeholder="language" onChange={handleChange} className="input"  />
        <input type="text" name="username" placeholder="username" onChange={handleChange} className="input"  />
        <button className="btni" onClick={handleClick}>Update</button>
      </form>
    </div>
  );
};

export default UserModal;