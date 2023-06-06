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
    nickname: user.nickname,
    bio: user.bio,
    language: user.language,
    username: user.username,
    coverpic: user.coverpic,
    profilepic: user.profilepic,
    id: currentUser.id,
    email: currentUser.email,
    usertype:currentUser.usertype
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
  
    let covUrl = user.coverpic;
    let proUrl = user.profilepic;
  
    if (cover) {
      covUrl = await upload(cover);
    }
  
    if (profile) {
      proUrl = await upload(profile);
    }
  
    const updatedData = {
      nickname: text.nickname !== "" ? text.nickname : data.nickname,
      bio: text.bio !== "" ? text.bio : data.bio,
      language: text.language !== "" ? text.language : data.language,
      username: text.username !== "" || text.username !== null ? text.username : data.username,
      coverpic: covUrl,
      profilepic: proUrl,
      id: currentUser.id,
      email: currentUser.email,
    usertype:currentUser.usertype,
      
    };
  
    const mergedData = { ...data, ...updatedData };
  
    mutation.mutate(mergedData);
  
    setOpenUserModal(false);
  };
  
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        console.log("updated", data);
        localStorage.setItem("user", JSON.stringify(data));
      },
    }
  );
  console.log(data)
  return (
    <div className="userModal">
      UserModal
      <form action="#" className="form">
        <button className="close" onClick={() => setOpenUserModal(false)}>
          x
        </button>
        <label htmlFor="coverPicture" className="uploadLabel" style={{ color: "rgb(87, 171, 255)" }}>
          Upload Profile Picture
        </label>
        <input type="file" id="coverPicture" onChange={(e) => setCover(e.target.files[0])} className="picInput" style={{ display: "none" }} />
        <label htmlFor="profilePicture" className="uploadLabel" style={{ color: "rgb(87, 171, 255)" }}>
          Upload Cover Picture
        </label>
        <input type="file" id="profilePicture" onChange={(e) => setProfile(e.target.files[0])} className="picInput" style={{ display: "none" }} />
        <input type="text" name="nickname" placeholder="nickname" onChange={handleChange} className="input" />
        <input type="text" name="bio" placeholder="bio" onChange={handleChange} className="input" />
        <input type="text" name="language" placeholder="language" onChange={handleChange} className="input" />
        <input type="text" name="username" placeholder="username" onChange={handleChange} className="input" />
        <button className="btni" onClick={handleClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UserModal;
