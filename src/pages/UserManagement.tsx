import { useState } from 'react';
import { Users, UserPlus, UserCog, Ban, Check, Search } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { managedUsers } from '@/data/mockData';
import type { ManagedUser, UserRole } from '@/types';

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator',
  analyst: 'Analyst',
  viewer: 'Viewer',
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-accent-500/15 text-accent-400 border border-accent-500/30',
  analyst: 'bg-primary-500/15 text-primary-400 border border-primary-500/30',
  viewer: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',
};

export function UserManagement() {
  const [users, setUsers] = useState<ManagedUser[]>(managedUsers);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<ManagedUser | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'viewer' as UserRole });

  const filtered = users.filter((u) =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newUser.name || !newUser.email) return;
    const user: ManagedUser = {
      id: `mu${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      lastActive: 'Just now',
      avatar: newUser.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    };
    setUsers((prev) => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'viewer' });
    setAddOpen(false);
  };

  const handleEditRole = (id: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    setEditUser(null);
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u
    ));
  };

  const activeCount = users.filter((u) => u.status === 'Active').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage user accounts, roles, and access permissions</p>
        </div>
        <button onClick={() => setAddOpen(true)} className="btn-primary px-4 py-2.5 flex items-center gap-2 text-sm">
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2"><Users className="w-5 h-5 text-primary-400" /><span className="text-xs text-gray-500">Total Users</span></div>
          <p className="text-2xl font-bold text-white">{users.length}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2"><Check className="w-5 h-5 text-success-400" /><span className="text-xs text-gray-500">Active</span></div>
          <p className="text-2xl font-bold text-success-400">{activeCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2"><Ban className="w-5 h-5 text-error-400" /><span className="text-xs text-gray-500">Disabled</span></div>
          <p className="text-2xl font-bold text-error-400">{users.length - activeCount}</p>
        </div>
        <div className="glass-card glass-card-hover p-4">
          <div className="flex items-center gap-2 mb-2"><UserCog className="w-5 h-5 text-accent-400" /><span className="text-xs text-gray-500">Admins</span></div>
          <p className="text-2xl font-bold text-accent-400">{adminCount}</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          className="glass-input w-full pl-10 pr-4 py-2 text-sm"
        />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-600/60">
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Active</th>
                <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-base-700/40 hover:bg-base-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-600/20 text-accent-400 text-xs font-semibold shrink-0">{u.avatar}</div>
                      <span className="text-sm text-gray-200">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{u.email}</td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${roleColors[u.role]}`}>{roleLabels[u.role]}</span></td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs ${u.status === 'Active' ? 'text-success-400' : 'text-error-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-success-500' : 'bg-error-500'}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">{u.lastActive}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditUser(u)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-300 hover:bg-base-700/60 transition-all" title="Edit Role">
                        <UserCog className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggleStatus(u.id)} className={`p-1.5 rounded-lg transition-all ${u.status === 'Active' ? 'text-gray-400 hover:text-error-400 hover:bg-error-500/10' : 'text-gray-400 hover:text-success-400 hover:bg-success-500/10'}`} title={u.status === 'Active' ? 'Disable' : 'Enable'}>
                        {u.status === 'Active' ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-2 p-2">
          {filtered.map((u) => (
            <div key={u.id} className="px-4 py-3 rounded-xl bg-base-700/40">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-600/20 text-accent-400 text-xs font-semibold shrink-0">{u.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200">{u.name}</p>
                  <p className="text-xs text-gray-500 truncate">{u.email}</p>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${roleColors[u.role]}`}>{roleLabels[u.role]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 text-xs ${u.status === 'Active' ? 'text-success-400' : 'text-error-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-success-500' : 'bg-error-500'}`} />
                  {u.status} · {u.lastActive}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditUser(u)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-300"><UserCog className="w-4 h-4" /></button>
                  <button onClick={() => handleToggleStatus(u.id)} className={`p-1.5 rounded-lg ${u.status === 'Active' ? 'text-error-400' : 'text-success-400'}`}>
                    {u.status === 'Active' ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New User">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Full Name</label>
            <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Enter full name" className="glass-input w-full px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Email Address</label>
            <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="user@worldmonitor.demo" className="glass-input w-full px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 mb-2 block">Role</label>
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })} className="glass-input w-full px-4 py-2.5 text-sm">
              <option value="admin" className="bg-base-800">Administrator</option>
              <option value="analyst" className="bg-base-800">Analyst</option>
              <option value="viewer" className="bg-base-800">Viewer</option>
            </select>
          </div>
          <button onClick={handleAdd} disabled={!newUser.name || !newUser.email} className="btn-primary w-full py-2.5 text-sm disabled:opacity-50">Add User</button>
        </div>
      </Modal>

      {/* Edit Role Modal */}
      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Edit User Role">
        {editUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-700/40">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-600/20 text-accent-400 text-sm font-semibold">{editUser.avatar}</div>
              <div>
                <p className="text-sm font-medium text-white">{editUser.name}</p>
                <p className="text-xs text-gray-500">{editUser.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              {(['admin', 'analyst', 'viewer'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleEditRole(editUser.id, role)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all ${editUser.role === role ? 'border-primary-600/40 bg-primary-600/10 text-primary-300' : 'border-base-600/60 bg-base-700/40 text-gray-400 hover:bg-base-700/60'}`}
                >
                  <div className={`flex items-center justify-center w-5 h-5 rounded-md border ${editUser.role === role ? 'border-primary-500 bg-primary-600' : 'border-base-400'}`}>
                    {editUser.role === role && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-sm font-medium">{roleLabels[role]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
