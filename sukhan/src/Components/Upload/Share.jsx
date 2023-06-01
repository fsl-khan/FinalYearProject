import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pdfFile", pdfFile);
      formData.append("desc", desc);
      // Append the PDF file
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
     
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if(file){
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc(null);
    setFile(null);
    }
    else
    {
    let pdfUrl = "";
    if (pdfFile) pdfUrl = await upload();
    mutation.mutate({ desc, pdf: pdfUrl });
    setDesc(null);
    setPdfFile(null);
    }
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilepic} alt="pic na hy" />


            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {(file  || pdfFile ) && (
              file?
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              : <span>{pdfFile.name}</span>
            
              
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="file"
              id="pdfFile"
              style={{ display: "none" }}
              onChange={(e) => setPdfFile(e.target.files[0])}
              accept=".pdf" // Limit file selection to PDF files only
            />
            <label htmlFor="file">
              <div className="item">
                <img src="/images/img.png" alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <label htmlFor="pdfFile">
              <div className="item">
                <img src="/images/book.png" alt="" />
                <span>Add Book</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
