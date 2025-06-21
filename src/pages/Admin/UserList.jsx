import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    useEffect(() => {
        const fetchSessionUsers = () => {
            setIsLoading(true);
            try {
                // Get users from sessionStorage
                const sessionUsers = JSON.parse(sessionStorage.getItem('users')) || [];
                // Get current user from session
                const currentUser = JSON.parse(sessionStorage.getItem('userInfo'));
                
                // Combine and filter to show only relevant users
                const allUsers = [...sessionUsers];
                if (currentUser && !allUsers.some(u => u._id === currentUser._id)) {
                    allUsers.push(currentUser);
                }

                setUsers(allUsers);
                setIsLoading(false);
            } catch (err) {
                setError(err.message || "Failed to load users");
                setIsLoading(false);
            }
        };

        fetchSessionUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                // Remove from state
                const updatedUsers = users.filter(user => user._id !== id);
                setUsers(updatedUsers);
                
                // Update sessionStorage
                const currentUser = JSON.parse(sessionStorage.getItem('userInfo'));
                if (currentUser && currentUser._id === id) {
                    sessionStorage.removeItem('userInfo');
                } else {
                    sessionStorage.setItem('users', JSON.stringify(updatedUsers));
                }
                
                toast.success("User deleted successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.error || "Failed to delete user");
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username || "");
        setEditableUserEmail(email || "");
    };

    const updateHandler = async (id) => {
        try {
            const updatedUsers = users.map(user => 
                user._id === id 
                    ? { ...user, username: editableUserName, email: editableUserEmail }
                    : user
            );
            
            setUsers(updatedUsers);
            setEditableUserId(null);
            
            // Update sessionStorage
            const currentUser = JSON.parse(sessionStorage.getItem('userInfo'));
            if (currentUser && currentUser._id === id) {
                sessionStorage.setItem('userInfo', JSON.stringify({
                    ...currentUser,
                    username: editableUserName,
                    email: editableUserEmail
                }));
            } else {
                sessionStorage.setItem('users', JSON.stringify(updatedUsers));
            }
            
            toast.success("User updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error || "Failed to update user");
        }
    };

    return (
        <div className="p-4">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error}
                </Message>
            ) : (
                <div className="flex flex-col md:flex-row">
                    <AdminMenu />
                    <table className="w-full md:w-4/5 mx-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-500">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">NAME</th>
                                <th className="px-4 py-2 text-left">EMAIL</th>
                                <th className="px-4 py-2 text-left">ADMIN</th>
                                <th className="px-4 py-2 text-left">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t">
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserName}
                                                    onChange={(e) =>
                                                        setEditableUserName(e.target.value)
                                                    }
                                                    className="w-full p-2 border rounded-lg text-black"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.username}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(
                                                            user._id,
                                                            user.username,
                                                            user.email
                                                        )
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem] hover:text-blue-500 cursor-pointer" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserEmail}
                                                    onChange={(e) =>
                                                        setEditableUserEmail(e.target.value)
                                                    }
                                                    className="w-full p-2 border rounded-lg text-black"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <a href={`mailto:${user.email}`}>
                                                    {user.email}
                                                </a>{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(
                                                            user._id,
                                                            user.username,
                                                            user.email
                                                        )
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem] hover:text-blue-500 cursor-pointer" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaCheck style={{ color: "red" }} />
                                        )}
                                    </td>
                                    {/* <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;