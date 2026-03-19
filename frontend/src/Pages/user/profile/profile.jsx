import React from "react";
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div style={styles.emptyState}>
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  // User ke naam ka pehla letter nikalne ke liye (Avatar ke liye)
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatar}>{initial}</div>
          <h2 style={styles.userName}>{user.name}</h2>
          <span style={styles.badge}>{user.role}</span>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Email Address</span>
            <span style={styles.value}>{user.email}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Account Status</span>
            <span style={{...styles.value, color: '#2ecc71'}}>Active</span>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.editBtn}>Edit Profile</button>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple inline styles for immediate use
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '25px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 15px',
  },
  userName: {
    margin: '10px 0 5px',
    fontSize: '24px',
    color: '#2c3e50',
  },
  badge: {
    backgroundColor: '#f1f2f6',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#7f8c8d',
    fontWeight: '600',
  },
  infoSection: {
    textAlign: 'left',
    borderTop: '1px solid #eee',
    paddingTop: '20px',
    marginBottom: '25px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  label: {
    color: '#95a5a6',
    fontSize: '14px',
  },
  value: {
    color: '#34495e',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #3498db',
    backgroundColor: 'transparent',
    color: '#3498db',
    cursor: 'pointer',
    fontWeight: '600',
  },
  logoutBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e74c3c',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '50px',
    color: '#7f8c8d'
  }
};

export default Profile;