import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, updateUser } from '../../../services/users/users'; 
// import "./AdminDashboard.css"; 

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editingUser, setEditingUser] = useState(null); 
  const [editFormData, setEditFormData] = useState({ fname: '', lname: '', role: '' });

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      console.error("Users load nahi ho paye", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      alert("User deleted!");
    } catch (error) {
      alert("Delete failed.");
    }
  };

  // Edit Button Click
  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditFormData({ fname: user.fname, lname: user.lname, role: user.role });
  };

  // Update Logic
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser, editFormData);
      alert("User updated successfully!");
      setEditingUser(null); // Modal close karein
      fetchUsers(); // List refresh karein
    } catch (error) {
      alert("Update failed.");
    }
  };

  return (
    <div className="content-padding">
      <div className="page-header">
        <div>
          <h1>User Accounts</h1>
          <p>Manage permissions and view all registered members.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-title">System Users</div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Profile</th>
                <th>Email Address</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="loading-text">Loading...</td></tr>
              ) : users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="product-cell">
                      <div className="admin-avatar">{user.fname?.[0]}{user.lname?.[0]}</div>
                      <div className="product-name-box">
                        <span className="p-name">{user.fname} {user.lname}</span>
                        <span className="p-desc">UID: {user._id.slice(-8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted">{user.email}</td>
                  <td>
                    <span className={`cat-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-icons">
                      <button className="edit-link" onClick={() => handleEditClick(user)}>
                        <span className="material-symbols-outlined">manage_accounts</span>
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="delete-btn-icon">
                        <span className="material-symbols-outlined">delete_forever</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update User Role</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  value={editFormData.fname} 
                  onChange={(e) => setEditFormData({...editFormData, fname: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  value={editFormData.lname} 
                  onChange={(e) => setEditFormData({...editFormData, lname: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Assign Role</label>
                <select 
                  value={editFormData.role} 
                  onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;