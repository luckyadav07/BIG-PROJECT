import { useEffect, useMemo, useState } from "react";
import { Users, User, ShieldCheck, ShieldOff, Trash2, Edit, Search, X } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import useUIStore from "../../store/uiStore.js";
import { formatDate } from "../../utils/formatters.js";
import { getAllUsers, updateUserRole, deleteUser } from "../../services/adminUserService.js";

function AdminUsersManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("user");
    const [modalError, setModalError] = useState("");
    const addToast = useUIStore((s) => s.addToast);

    useEffect(() => {
        fetchUsers();
    }, []);

    const getUserId = (user) => user?.id || user?._id;

    const parseApiError = (errorResponse) => {
        if (!errorResponse) return null;
        if (typeof errorResponse === "string") return errorResponse;
        if (errorResponse.message) return errorResponse.message;
        if (errorResponse.error) return errorResponse.error;
        if (Array.isArray(errorResponse)) return errorResponse.join(" ");
        const values = Object.values(errorResponse).flatMap((value) => {
            if (typeof value === "string") return [value];
            if (Array.isArray(value)) return value;
            return [];
        });
        return values.join(" ") || null;
    };

    const getErrorMessage = (err, fallback) => {
        return (
            parseApiError(err?.response?.data) ||
            err?.message ||
            fallback
        );
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAllUsers();
            setUsers(Array.isArray(response) ? response : []);
        } catch (err) {
            setError(getErrorMessage(err, "Unable to load users."));
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user?.role === "admin" ? "admin" : "user");
        setModalError("");
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
        setSelectedRole("user");
        setModalError("");
    };

    const handleSaveRole = async () => {
        if (!selectedUser) return;
        setSaving(true);
        setModalError("");

        try {
            const updated = await updateUserRole(getUserId(selectedUser), { role: selectedRole });
            const updatedUser = updated && typeof updated === "object" ? updated : null;

            if (updatedUser) {
                setUsers((prev) => prev.map((user) => (getUserId(user) === getUserId(updatedUser) ? updatedUser : user)));
            } else {
                await fetchUsers();
            }
            addToast("User role updated successfully");
            closeModal();
        } catch (err) {
            setModalError(getErrorMessage(err, "Unable to update user role."));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (user) => {
        if (!window.confirm("Delete this user permanently?")) return;
        setError("");
        setSaving(true);

        try {
            await deleteUser(getUserId(user));
            setUsers((prev) => prev.filter((item) => getUserId(item) !== getUserId(user)));
            addToast("User deleted successfully");
        } catch (err) {
            setError(getErrorMessage(err, "Unable to delete user."));
        } finally {
            setSaving(false);
        }
    };

    const filteredUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return Array.isArray(users) ? users : [];
        return (Array.isArray(users) ? users : []).filter((user) => {
            const name = (user?.name || "").toLowerCase();
            const email = (user?.email || "").toLowerCase();
            return name.includes(query) || email.includes(query);
        });
    }, [searchTerm, users]);

    const stats = useMemo(() => {
        const list = Array.isArray(users) ? users : [];
        const totalUsers = list.length;
        const totalAdmins = list.filter((user) => user?.role === "admin").length;
        const normalUsers = totalUsers - totalAdmins;
        return { totalUsers, totalAdmins, normalUsers };
    }, [users]);

    const getSkillsCount = (user) => {
        if (Array.isArray(user?.skills)) return user.skills.length;
        if (typeof user?.skillsCount === "number") return user.skillsCount;
        return 0;
    };

    const getJoinedDate = (user) => {
        return formatDate(user?.createdAt || user?.joinedAt || user?.registeredAt || user?.created_at);
    };

    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                    <p className="text-gray-400">Review users, update roles, and remove accounts safely.</p>
                </div>
                <div className="max-w-md w-full">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <Input
                            className="pl-11"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-4 mb-6 sm:grid-cols-3">
                <Card>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Users</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
                        </div>
                        <Users size={28} className="text-accent" />
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Admins</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.totalAdmins}</p>
                        </div>
                        <ShieldCheck size={28} className="text-success" />
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Normal Users</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.normalUsers}</p>
                        </div>
                        <User size={28} className="text-warning" />
                    </div>
                </Card>
            </div>

            {error && (
                <div className="mb-4 rounded-lg border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <Card className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 bg-white/5">
                                <th className="px-4 py-3">User ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Skills</th>
                                <th className="px-4 py-3">Joined</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-8 text-center text-gray-400">Loading users...</td>
                                </tr>
                            ) : !Array.isArray(filteredUsers) || filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-8 text-center text-gray-400">No users found.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={getUserId(user)} className="border-t border-white/5 hover:bg-white/5">
                                        <td className="px-4 py-3 text-gray-400">{getUserId(user)}</td>
                                        <td className="px-4 py-3 text-white">{user?.name || "—"}</td>
                                        <td className="px-4 py-3 text-gray-400">{user?.email || "—"}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={user?.role === "admin" ? "success" : "secondary"}>{user?.role || "user"}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400">{getSkillsCount(user)}</td>
                                        <td className="px-4 py-3 text-gray-400">{getJoinedDate(user)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-2">
                                                <Button size="sm" variant="outline" onClick={() => openEditModal(user)}>
                                                    <Edit size={14} /> Role
                                                </Button>
                                                <Button size="sm" variant="ghost" onClick={() => handleDelete(user)} disabled={saving}>
                                                    <Trash2 size={14} /> Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {modalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-xl rounded-3xl bg-navy-light border border-white/10 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-white">Edit User Role</h2>
                                <p className="text-sm text-gray-400">Update the role for {selectedUser?.name || selectedUser?.email}.</p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    <option value="user" className="bg-navy">User</option>
                                    <option value="admin" className="bg-navy">Admin</option>
                                </select>
                            </div>

                            {modalError && (
                                <div className="rounded-lg border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-red-200">
                                    {modalError}
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 justify-end pt-2">
                                <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                                <Button type="button" onClick={handleSaveRole} loading={saving}>Save Role</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUsersManagement;
