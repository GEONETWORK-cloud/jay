'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiUser, FiMail, FiTag, FiSave, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { showNotification } from '@/lib/utils';

interface UserData {
  id: string;
  email: string;
  displayName?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function EditUserPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const params = useParams();
  const { user: currentUser } = useAuth();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  // Check if current user is admin
  const isAdmin = currentUser?.email === 'rennielgeogeanga12@gmail.com';

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Redirect non-admin users
    if (!isAdmin) {
      router.push('/');
      return;
    }

    async function fetchUser() {
      if (!currentUser) return; // Early return if currentUser is null
      
      try {
        setLoading(true);
        setError(null);
        
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          setError('User not found');
          setLoading(false);
          return;
        }
        
        const userData = userSnap.data();
        setUser({
          id: userSnap.id,
          ...userData
        } as UserData);
        
        setDisplayName(userData.displayName || '');
        setRole(userData.role || 'user');
        
      } catch (error) {
        console.error('Error loading user:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [currentUser, userId, router, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      // Don't allow admin role change for non-admin email
      if (role === 'admin' && user?.email !== 'rennielgeogeanga12@gmail.com') {
        setError('Cannot set admin role for this user');
        setSaving(false);
        return;
      }
      
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        displayName,
        role,
        updatedAt: new Date()
      });
      
      showNotification('User updated successfully', 'success');
      router.push('/users');
      
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to update user. Please try again.');
      setSaving(false);
    }
  };

  if (!currentUser || !isAdmin) {
    return null; // Router will redirect, but this prevents flash of content
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.push('/users')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2" />
            Back to Users
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Edit User</h1>
          <p className="text-gray-600">Update user information and permissions</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start">
            <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 flex justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 text-gray-500">
                  <FiMail className="mr-2" />
                  <span>{user?.email}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>
              
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-2 text-gray-500">
                    <FiUser />
                  </div>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="block w-full px-3 py-2 outline-none"
                    placeholder="Enter display name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-2 text-gray-500">
                    <FiTag />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full px-3 py-2 outline-none"
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    {currentUser.email === 'rennielgeogeanga12@gmail.com' && (
                      <option value="admin">Admin</option>
                    )}
                  </select>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 