import React from "react";
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Please login to view profile.</p>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;