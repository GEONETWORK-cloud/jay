'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiSave, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { showNotification } from '@/lib/utils';

interface UserData {
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchUserData() {
      if (!user) return; // Early return if user is null
      
      try {
        setLoading(true);
        setError(null);
        
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUserData(data);
          setDisplayName(data.displayName || '');
        } else {
          // Create user document if it doesn't exist
          const newUserData: UserData = {
            email: user.email || '',
            displayName: '',
            createdAt: new Date()
          };
          
          await setDoc(doc(db, 'users', user.uid), newUserData);
          setUserData(newUserData);
          setDisplayName('');
        }
        
      } catch (error) {
        console.error('Error loading user data:', error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        updatedAt: new Date()
      });
      
      showNotification('Profile updated successfully', 'success');
      
      // Refresh user data
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setUserData(updatedSnap.data() as UserData);
      }
      
      setSaving(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to update profile. Please try again.');
      setSaving(false);
    }
  };

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600">View and edit your account information</p>
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
                  <span>{user.email}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Your email cannot be changed</p>
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
                    placeholder="Enter your display name"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  This name will be displayed to other users in the application
                </p>
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
