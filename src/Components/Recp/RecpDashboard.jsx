import React from "react";  

function RecpDashboard({ user, onLogout }) {
    return(
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Receptionist Dashboard</h1>
                <button onClick={onLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
            <p>Welcome, {user?.name || 'Receptionist'}!</p>
            <p>Email: {user?.email}</p>
        </div>
    );
}

export default RecpDashboard;