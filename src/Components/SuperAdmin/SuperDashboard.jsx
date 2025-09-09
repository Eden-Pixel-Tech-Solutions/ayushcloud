import React from 'react'

function SuperDashboard({ user, onLogout }) {
    return(
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Super Admin Dashboard</h1>
                <button onClick={onLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
            <p>Welcome, {user?.name || 'Super Admin'}!</p>
            <p>Email: {user?.email}</p>
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
                <h3 style={{ color: '#0369a1', marginBottom: '1rem' }}>Admin Privileges</h3>
                <p style={{ color: '#0c4a6e' }}>You have full system access and administrative privileges.</p>
            </div>
        </div>
    );
}

export default SuperDashboard;