import React, { useState } from "react";
import "./AdminPage.scss";

const AdminPage = () => {
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
