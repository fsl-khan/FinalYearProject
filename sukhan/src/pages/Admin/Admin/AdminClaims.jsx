import React, { useEffect, useState } from "react";
import "./AdminClaims.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminClaims = () => {

  const [claimedData, setClaimedData] = useState();

  const [data, setData] = useState();
  const getUser = async () => {
    const response = await axios.get("http://localhost:8800/api/users/all");
    const res = await axios.get("http://localhost:8800/api/posts/claimPost");
    const data = response.data;
    const datas = res.data;
    setData(data);
    setClaimedData(datas);
  };
  
  useEffect(() => {
    getUser();
  }, []);

const [err, setError] = useState('');
const handleClaimChange = async (claimId) => {
  console.log(claimId, "raaa");
  try {
  await axios.delete(`http://localhost:8800/api/posts/claim/${claimId}`);
    getUser();
  } catch (error) {
    console.log(error);
    setError(error.response.data)
  }
};
  return (
    <>
       <Link to="/admin" >
      <button className="claimButtons" >Poet Requests</button>
      </Link>
    <div className="main">
     <div className="claims">
      <h3>Claims</h3>
      <h5 style={{color:"red"}}>{err}</h5>
      <table border={"1px"}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Post</th>
            <th>Claim By</th>
            <th>Claim At</th>
            <th>Reference</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        { claimedData && claimedData.map((claims) => (
            // 
            <tr key={claims.id}>
              <td className="claimPost" >{claims?.desc}
              <img src={"./../upload/" + claims?.img} />
              </td>
              <td>{claims.claimBy}</td>
              <td>{claims.claimAt}</td>
              <td><pre>{claims.Reference}</pre></td>
              <td>
              <button onClick={() => handleClaimChange(claims.Post)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
    </div>
    </>
  );
};

export default AdminClaims;
