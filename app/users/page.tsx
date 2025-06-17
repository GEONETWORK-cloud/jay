'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUsers, FiUserPlus, FiUserX, FiSearch, FiEdit, FiTrash2, FiMail, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { loadUsers, deleteUser } from '@/lib/firebaseService';

interface UserData {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();
  const { user } = useAuth();

  // Check if current user is admin
  const isAdmin = user?.email === 'rennielgeogeanga12@gmail.com';

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect non-admin users
    if (!isAdmin) {
      router.push('/');
      return;
    }

    async function fetchUsers() {
      if (!user) return; // Early return if user is null
      
      try {
        setLoading(true);
        setError(null);
        const usersList = await loadUsers() as UserData[];
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (error) {
        console.error('Error loading users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [user, router, isAdmin]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(
        user => 
          (user.displayName || '').toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          (user.role || '').toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDeleteClick = (userId: string) => {
    setDeleteConfirm(userId);
  };

  const confirmDelete = async (userId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      setError(null);
      setIsRetrying(false);
      
      // Don't allow admin to delete themselves
      if (userId === user.uid) {
        setError("You cannot delete your own account");
        setDeleteConfirm(null);
        return;
      }

      // Check if trying to delete the admin account
      const userToDelete = users.find(u => u.id === userId);
      if (userToDelete?.email === 'rennielgeogeanga12@gmail.com') {
        setError("Admin account cannot be deleted");
        setDeleteConfirm(null);
        return;
      }

      // Check if user still exists
      if (!userToDelete) {
        setError("User not found. They may have already been deleted.");
        setDeleteConfirm(null);
        return;
      }

      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      setFilteredUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      setDeleteConfirm(null);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error deleting user:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to delete user: ${errorMessage}. ${retryCount < 3 ? 'Retrying...' : 'Max retries reached.'}`);
      
      // Implement retry logic (up to 3 attempts)
      if (retryCount < 3) {
        setIsRetrying(true);
        setRetryCount(prev => prev + 1);
        
        // Retry after a short delay
        setTimeout(() => {
          if (userId) {
            confirmDelete(userId);
          }
        }, 1000); // Wait 1 second before retrying
      } else {
        setIsRetrying(false);
        setRetryCount(0);
      }
    }
  };
  
  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Never';
    
    try {
      // Handle Firestore Timestamp
      if (timestamp && typeof timestamp.toDate === 'function') {
        return new Date(timestamp.toDate()).toLocaleDateString();
      }
      
      // Handle timestamp as number
      if (typeof timestamp === 'number') {
        return new Date(timestamp).toLocaleDateString();
      }
      
      // Handle as Date or string
      return new Date(timestamp).toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (!user || !isAdmin) {
    return null; // Router will redirect, but this prevents flash of content
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
          <button 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            onClick={() => router.push('/users/new')}
          >
            <FiUserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start">
            <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(userData => (
                    <tr key={userData.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={userData.photoURL || `https://via.placeholder.com/40?text=${userData.displayName?.charAt(0) || 'U'}`} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {userData.displayName || 'Unnamed User'}
                            </div>
                            {userData.id === user.uid && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{userData.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          userData.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800'
                            : userData.role === 'editor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {userData.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(userData.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(userData.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => router.push(`/users/${userData.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit user"
                          >
                            <FiEdit size={18} />
                          </button>
                          {userData.email !== 'rennielgeogeanga12@gmail.com' && (
                            <button
                              onClick={() => handleDeleteClick(userData.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete user"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-500"
                title="Close delete confirmation"
              >
                <FiUserX size={20} />
              </button>
            </div>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                disabled={isRetrying}
              >
                {isRetrying ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 