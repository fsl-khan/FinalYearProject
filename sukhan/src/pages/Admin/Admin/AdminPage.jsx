import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = () => {

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

  const handleUserStatusChange = async (userid) => {
    console.log(userid, "raaa")
    try {
      await axios.post('http://localhost:8800/api/users/update', {
        id: userid
      });
      getUser();
    } catch (error) {
      console.log(error)
    }
   
  };
const [err, setError] = useState('');
  return (
    <>
    <div className="main">
    <div className="admin-page">
      <h1>Admin Page</h1>
      <Link to="/adminClaims" >
      <button className="claimButton" >Claims</button>
      </Link>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Sample</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { data && data.map((user) => (
            // 
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.usertype === "0" ? "MEMEBER": "POET"}</td>
              <td><pre>{user.sample}</pre></td>
              <td>
                <button
                  onClick={() =>
                    handleUserStatusChange(user.id)
                  }
                >
                 Update 
                </button>
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

export default AdminPage;
