import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, Shield, Users, Lock, Unlock, Edit2, Trash2, ChevronDown, ChevronRight, Check, X, Download } from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import '../../../assets/css/access-controls.css';

const AccessControls = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'active',
    role: 'all',
    department: 'all'
  });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  // Mock data for users
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockUsers = [
          {
            id: 'USR-001',
            name: 'Dr. Sarah Johnson',
            email: 's.johnson@hospital.org',
            role: 'Doctor',
            department: 'Cardiology',
            status: 'active',
            lastActive: '2024-09-18T14:32:45Z',
            permissions: [
              'view_patient_records', 'edit_patient_records', 'prescribe_medication',
              'view_lab_results', 'request_consultation'
            ]
          },
          {
            id: 'USR-045',
            name: 'Nurse Michael Chen',
            email: 'm.chen@hospital.org',
            role: 'Nurse',
            department: 'Emergency',
            status: 'active',
            lastActive: '2024-09-18T10:15:22Z',
            permissions: [
              'view_patient_records', 'update_vital_signs', 'administer_medication',
              'view_lab_results'
            ]
          },
          {
            id: 'ADM-001',
            name: 'Admin User',
            email: 'admin@hospital.org',
            role: 'Administrator',
            department: 'IT',
            status: 'active',
            lastActive: '2024-09-18T16:48:12Z',
            permissions: [
              'manage_users', 'manage_roles', 'system_configuration',
              'audit_logs', 'data_export'
            ]
          },
          {
            id: 'USR-012',
            name: 'Dr. Robert Davis',
            email: 'r.davis@hospital.org',
            role: 'Doctor',
            department: 'Neurology',
            status: 'inactive',
            lastActive: '2024-09-15T09:22:18Z',
            permissions: [
              'view_patient_records', 'edit_patient_records', 'prescribe_medication',
              'view_lab_results', 'request_consultation'
            ]
          },
          {
            id: 'USR-078',
            name: 'Dr. Emily Wilson',
            email: 'e.wilson@hospital.org',
            role: 'Doctor',
            department: 'Pediatrics',
            status: 'pending',
            lastActive: null,
            permissions: []
          }
        ];

        const mockRoles = [
          { id: 'ROLE-001', name: 'Administrator', userCount: 3, description: 'Full system access' },
          { id: 'ROLE-002', name: 'Doctor', userCount: 24, description: 'Medical staff with full patient care access' },
          { id: 'ROLE-003', name: 'Nurse', userCount: 48, description: 'Nursing staff with patient care access' },
          { id: 'ROLE-004', name: 'Receptionist', userCount: 12, description: 'Front desk and appointment management' },
          { id: 'ROLE-005', name: 'Lab Technician', userCount: 8, description: 'Lab test management and results' },
          { id: 'ROLE-006', name: 'Billing Staff', userCount: 6, description: 'Financial and billing operations' }
        ];

        const mockPermissions = [
          { id: 'PERM-001', name: 'view_patient_records', description: 'View patient medical records' },
          { id: 'PERM-002', name: 'edit_patient_records', description: 'Edit patient medical records' },
          { id: 'PERM-003', name: 'prescribe_medication', description: 'Prescribe medication to patients' },
          { id: 'PERM-004', name: 'view_lab_results', description: 'View laboratory test results' },
          { id: 'PERM-005', name: 'request_consultation', description: 'Request consultations with other specialists' },
          { id: 'PERM-006', name: 'update_vital_signs', description: 'Update patient vital signs' },
          { id: 'PERM-007', name: 'administer_medication', description: 'Record medication administration' },
          { id: 'PERM-008', name: 'manage_users', description: 'Create, edit, and deactivate user accounts' },
          { id: 'PERM-009', name: 'manage_roles', description: 'Create and manage user roles and permissions' },
          { id: 'PERM-010', name: 'system_configuration', description: 'Modify system settings and configurations' },
          { id: 'PERM-011', name: 'audit_logs', description: 'View system audit logs' },
          { id: 'PERM-012', name: 'data_export', description: 'Export data from the system' }
        ];

        setUsers(mockUsers);
        setRoles(mockRoles);
        setPermissions(mockPermissions);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Chart data for role distribution
  const roleDistributionData = {
    labels: roles.map(role => role.name),
    datasets: [
      {
        data: roles.map(role => role.userCount),
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6',
          '#F97316', '#6366F1', '#06B6D4', '#F43F5E', '#8B5CF6', '#EC4899'
        ]
      }
    ]
  };

  // Chart data for permission usage
  const permissionUsageData = {
    labels: ['View Records', 'Edit Records', 'Prescribe', 'Lab Results', 'Consultations', 'Vital Signs', 'Medication', 'User Management', 'Role Management', 'System Config', 'Audit Logs', 'Data Export'],
    datasets: [
      {
        label: 'Permission Usage',
        data: [45, 32, 28, 36, 24, 30, 28, 5, 3, 3, 8, 6],
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      }
    ]
  };

  const toggleUserExpansion = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  const handleAddUser = () => {
    // In a real app, this would be an API call
    const newUserObj = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newUser,
      status: 'active',
      lastActive: new Date().toISOString(),
      permissions: []
    };
    
    setUsers([...users, newUserObj]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: '', department: '' });
  };

  const handleAddRole = () => {
    // In a real app, this would be an API call
    const newRoleObj = {
      id: `ROLE-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newRole,
      userCount: 0
    };
    
    setRoles([...roles, newRoleObj]);
    setShowAddRoleModal(false);
    setNewRole({ name: '', description: '', permissions: [] });
  };

  const togglePermission = (permissionId) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', text: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesDept = filters.department === 'all' || user.department === filters.department;
    
    return matchesSearch && matchesStatus && matchesRole && matchesDept;
  });

  return (
    <div className="access-controls-container">
      <div className="page-header">
        <div className="header-content">
          <h1><Shield size={24} className="text-indigo-600" /> Role-Based Access Control</h1>
          <p>Manage user roles, permissions, and access controls</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn primary"
            onClick={() => setShowAddUserModal(true)}
          >
            <UserPlus size={16} className="mr-2" /> Add User
          </button>
          <button 
            className="btn outline ml-2"
            onClick={() => setShowAddRoleModal(true)}
          >
            <Users size={16} className="mr-2" /> Add Role
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
          <div className="stat-trend positive">+5% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{roles.length}</div>
          <div className="stat-label">Roles</div>
          <div className="stat-trend neutral">No change</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{permissions.length}</div>
          <div className="stat-label">Permissions</div>
          <div className="stat-trend positive">+2 from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{users.filter(u => u.status === 'active').length}</div>
          <div className="stat-label">Active Users</div>
          <div className="stat-trend positive">↑ 8 from last month</div>
        </div>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Role</label>
          <select 
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value})}
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Department</label>
          <select 
            value={filters.department}
            onChange={(e) => setFilters({...filters, department: e.target.value})}
          >
            <option value="all">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Emergency">Emergency</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="IT">IT</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
      </div>

      <div className="content-grid">
        <div className="users-section">
          <div className="section-header">
            <h2>Users</h2>
            <span className="badge">{filteredUsers.length} users</span>
          </div>
          
          <div className="users-list">
            {isLoading ? (
              <div className="loading-text">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="empty-state">
                <Users size={48} className="text-gray-300" />
                <h3>No users found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredUsers.map(user => (
                <div key={user.id} className="user-card">
                  <div 
                    className="user-summary"
                    onClick={() => toggleUserExpansion(user.id)}
                  >
                    <div className="user-avatar">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="user-info">
                      <div className="user-name">
                        {user.name}
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="user-email">{user.email}</div>
                      <div className="user-meta">
                        <span>{user.role}</span>
                        <span>•</span>
                        <span>{user.department}</span>
                      </div>
                    </div>
                    <button 
                      className={`expand-btn ${expandedUser === user.id ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUserExpansion(user.id);
                      }}
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                  
                  {expandedUser === user.id && (
                    <div className="user-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">User ID:</span>
                          <span className="detail-value">{user.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Last Active:</span>
                          <span className="detail-value">{formatDate(user.lastActive)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <div className="detail-value">
                            {getStatusBadge(user.status)}
                            <button 
                              className="btn small ml-2"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? (
                                <><Lock size={14} className="mr-1" /> Deactivate</>
                              ) : (
                                <><Unlock size={14} className="mr-1" /> Activate</>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="detail-item full-width">
                          <span className="detail-label">Permissions:</span>
                          <div className="permissions-grid">
                            {user.permissions.length > 0 ? (
                              user.permissions.map(permId => {
                                const perm = permissions.find(p => p.id === permId) || { name: permId };
                                return (
                                  <span key={permId} className="permission-tag">
                                    {perm.name.replace(/_/g, ' ')}
                                  </span>
                                );
                              })
                            ) : (
                              <span className="text-gray-500">No specific permissions assigned</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="detail-actions">
                        <button className="btn small outline">
                          <Edit2 size={14} className="mr-1" /> Edit User
                        </button>
                        <button className="btn small outline">
                          <Shield size={14} className="mr-1" /> Manage Permissions
                        </button>
                        <button className="btn small danger">
                          <Trash2 size={14} className="mr-1" /> Delete User
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="right-sidebar">
          <div className="chart-card">
            <h3>Users by Role</h3>
            <div className="chart-wrapper">
              <Pie 
                data={roleDistributionData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Permission Usage</h3>
            <div className="chart-wrapper">
              <Bar 
                data={permissionUsageData} 
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="btn small full-width">
              <UserPlus size={14} className="mr-2" /> Add New User
            </button>
            <button className="btn small outline full-width mt-2">
              <Shield size={14} className="mr-2" /> Create New Role
            </button>
            <button className="btn small outline full-width mt-2">
              <Download size={14} className="mr-2" /> Export User List
            </button>
          </div>
        </div>
      </div>
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select 
                  value={newUser.department}
                  onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                >
                  <option value="">Select a department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="IT">IT</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn outline"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || !newUser.role || !newUser.department}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Role</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddRoleModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Role Name</label>
                <input 
                  type="text" 
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  placeholder="Enter role name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  placeholder="Enter role description"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Permissions</label>
                <div className="permissions-list">
                  {permissions.map(permission => (
                    <div 
                      key={permission.id} 
                      className={`permission-item ${newRole.permissions.includes(permission.id) ? 'selected' : ''}`}
                      onClick={() => togglePermission(permission.id)}
                    >
                      <div className="permission-checkbox">
                        {newRole.permissions.includes(permission.id) && <Check size={14} />}
                      </div>
                      <div className="permission-details">
                        <div className="permission-name">
                          {permission.name.replace(/_/g, ' ')}
                        </div>
                        <div className="permission-desc">
                          {permission.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn outline"
                onClick={() => setShowAddRoleModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleAddRole}
                disabled={!newRole.name}
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControls;
