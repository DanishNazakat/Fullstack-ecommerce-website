import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, updateUser } from '../../../services/users/users'; 
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import "./UserManagement.css"; 

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); 
  const [editFormData, setEditFormData] = useState({ fname: '', lname: '', role: '' });

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      toast.error("Users load nahi ho paye");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      toast.success("User removed successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditFormData({ fname: user.fname, lname: user.lname, role: user.role });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatePromise = updateUser(editingUser, editFormData);
    
    toast.promise(updatePromise, {
      loading: 'Updating user...',
      success: () => {
        setEditingUser(null);
        fetchUsers();
        return <b>User updated successfully!</b>;
      },
      error: <b>Update failed.</b>,
    });
  };

  return (
    <div className="admin-layout">
      <Toaster position="top-right" />
      
      {/* Sidebar Integration */}
      <aside className="sidebar-glass">
        <div className="brand-area">
          <div className="brand-logo">SM</div>
          <h2 className="brand-name">ShopModern</h2>
        </div>
        <nav className="nav-menu">
          <Link to="/AdminDashboard" className="nav-item">
            <span className="material-symbols-outlined">grid_view</span>
            <span>Inventory</span>
          </Link>
          <Link to="/OrderManagement" className="nav-item">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Orders</span>
          </Link>
          <Link to="/admin/users" className="nav-item active">
            <span className="material-symbols-outlined">group_work</span>
            <span>Customers</span>
          </Link>
        </nav>
      </aside>

      <main className="main-viewport">
        <header className="top-bar">
          <div className="page-header-text">
            <h1>User Accounts</h1>
            <p>Manage permissions and view all registered members.</p>
          </div>
          <div className="user-count-badge">Total Users: {users.length}</div>
        </header>

        <div className="dashboard-body">
          <div className="data-table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" className="loader-cell"><div className="ap-loader"></div></td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-profile-cell">
                          <div className="avatar-circle">
                            {user.fname?.[0]}{user.lname?.[0]}
                          </div>
                          <div>
                            <p className="u-name">{user.fname} {user.lname}</p>
                            <span className="u-id">ID: {user._id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="u-email">{user.email}</td>
                      <td>
                        <span className={`role-pill ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group">
                          <button className="action-btn edit" onClick={() => handleEditClick(user)}>
                            <span className="material-symbols-outlined">edit_square</span>
                          </button>
                          <button onClick={() => handleDelete(user._id)} className="action-btn delete">
                            <span className="material-symbols-outlined">person_remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- MODERN EDIT MODAL --- */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content-glass">
            <div className="modal-header">
              <h3>Edit User Access</h3>
              <button className="close-x" onClick={() => setEditingUser(null)}>&times;</button>
            </div>
            <form onSubmit={handleUpdate} className="modal-form">
              <div className="form-row">
                <div className="form-input-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    value={editFormData.fname} 
                    onChange={(e) => setEditFormData({...editFormData, fname: e.target.value})}
                    required
                  />
                </div>
                <div className="form-input-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    value={editFormData.lname} 
                    onChange={(e) => setEditFormData({...editFormData, lname: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-input-group">
                <label>System Role</label>
                <select 
                  value={editFormData.role} 
                  onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                >
                  <option value="user">Standard User</option>
                  <option value="admin">Super Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setEditingUser(null)}>Discard</button>
                <button type="submit" className="btn-save">Update Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

