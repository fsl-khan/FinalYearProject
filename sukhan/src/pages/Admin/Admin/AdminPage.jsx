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


  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "admin",
      isActive: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "user",
      isActive: true,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      role: "user",
      isActive: false,
    },
  ]);

  const handleUserStatusChange = (userId, newStatus) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === userId ? { ...user, isActive: newStatus } : user
      )
    );
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
              <td>
                <button
                  className={user.isActive ? "active-button" : "inactive-button"}
                  onClick={() =>
                    handleUserStatusChange(user.id, !user.isActive)
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
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
