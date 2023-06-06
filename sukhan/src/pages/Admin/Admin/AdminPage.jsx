import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
// import { QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../../axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminPage = () => {

  // const { isLoading, error, data } = useQuery(['ddd'], () =>
  //   makeRequest.get('/user/all').then((res) => {
  //     return res.data;
  //   })
  // );
  const [data, setData] = useState();
  const getUser = async () => {
    const response = await axios.get("http://localhost:8800/api/users/all");
    const data = response.data;
    setData(data);
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
console.log(data)
  return (
  
    <div className="admin-page">
      <h1>Admin Page</h1>
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
            // </QueryClientProvider>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
