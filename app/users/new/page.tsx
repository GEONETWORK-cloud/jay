'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiTag, FiUserPlus, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { showNotification } from '@/lib/utils';

export default function NewUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { user: currentUser } = useAuth();

  // Check if current user is admin
  const isAdmin = currentUser?.email === 'rennielgeogeanga12@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Don't allow admin role creation unless by admin
      if (role === 'admin' && currentUser.email !== 'rennielgeogeanga12@gmail.com') {
        setError('You cannot create admin users');
        setLoading(false);
        return;
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        email,
        displayName,
        role,
        createdAt: new Date(),
        createdBy: currentUser.uid
      });
      
      showNotification('User created successfully', 'success');
      router.push('/users');
      
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak - must be at least 6 characters');
      } else {
        setError('Failed to create user. Please try again.');
      }
      
      setLoading(false);
    }
  };

  if (!currentUser) {
    router.push('/login');
    return null;
  }

  if (!isAdmin) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
            <p className="text-gray-600">Create a new user account</p>
          </div>
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300"
            onClick={() => router.push('/users')}
          >
            <FiArrowLeft size={18} />
            <span>Back to Users</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start">
            <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 text-gray-500">
                  <FiMail />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 outline-none"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 text-gray-500">
                  <FiLock />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 outline-none"
                  placeholder="Enter password"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 6 characters long
              </p>
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
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FiUserPlus size={18} />
                    <span>Create User</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 