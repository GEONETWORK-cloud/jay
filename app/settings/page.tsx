'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiSave, FiAlertCircle, FiSettings, FiImage, FiLink, FiUpload, FiEye, FiEyeOff } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { showNotification } from '@/lib/utils';
import { createHash } from 'crypto';

interface UserData {
  email: string;
  displayName: string;
  showEmail: boolean;
  emailPrivacy: 'public' | 'private';
  notifications: {
    email: boolean;
    push: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showActivity: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  photoURL?: string;
  updatedAt: Date;
  role?: 'admin' | 'user';
  createdAt?: Date;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile image states
  const [imageUrl, setImageUrl] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageMethod, setImageMethod] = useState<'url' | 'upload' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Email privacy state
  const [emailPrivacy, setEmailPrivacy] = useState(false);
  
  const router = useRouter();
  const { user } = useAuth();

  // Function to get Gravatar URL from email
  const getGravatarUrl = (email: string) => {
    if (!email) return 'https://via.placeholder.com/150';
    
    const hash = createHash('md5')
      .update(email.toLowerCase().trim())
      .digest('hex');
      
    return `https://www.gravatar.com/avatar/${hash}?s=150&d=mp`;
  };

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
        
        // Set initial profile image from auth or gravatar
        const initialProfileImage = user.photoURL || (user.email ? getGravatarUrl(user.email) : '');
        setProfileImage(initialProfileImage);
        
        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUserData(data);
          setDisplayName(data.displayName || '');
          setEmailPrivacy(data.emailPrivacy === 'public');
          
          // If user has a custom photoURL in Firestore, use that
          if (data.photoURL) {
            setProfileImage(data.photoURL);
          }
        } else {
          // Create user document if it doesn't exist
          const newUserData = {
            email: user.email,
            displayName: '',
            emailPrivacy: 'private',
            showEmail: false,
            notifications: { email: false, push: false },
            privacy: { profileVisibility: 'public', showActivity: true },
            theme: 'light',
            createdAt: new Date(),
            updatedAt: new Date()
          } as UserData;
          
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

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showNotification('Please select a valid image file (JPEG, PNG, GIF)', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image must be less than 5MB', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `profile-images/${user?.uid}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfileImage(downloadURL);
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      showNotification('Failed to upload image', 'error');
      setIsUploading(false);
    }
  };

  // Handle URL method submission
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    
    // Basic URL validation
    try {
      new URL(imageUrl);
      setProfileImage(imageUrl);
      setImageUrl('');
      setImageMethod(null);
    } catch (error) {
      showNotification('Please enter a valid URL', 'error');
    }
  };

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
        photoURL: profileImage,
        emailPrivacy: emailPrivacy ? 'public' : 'private',
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

  // Toggle email privacy
  const toggleEmailPrivacy = () => {
    setEmailPrivacy(!emailPrivacy);
  };

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start">
            <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="sm:flex sm:items-center">
              <div className="px-4 sm:px-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'profile'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    title="Profile settings"
                    aria-label="Profile settings"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('account')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'account'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    title="Account settings"
                    aria-label="Account settings"
                  >
                    Account
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              {activeTab === 'profile' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Image Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Profile Image</label>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      {/* Image Preview */}
                      <div className="flex-shrink-0">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                          {profileImage ? (
                            <img 
                              src={profileImage} 
                              alt="Profile Preview" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <FiUser size={48} />
                            </div>
                          )}
                          {isUploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Image Options */}
                      <div className="w-full space-y-4">
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setImageMethod('url')}
                            className={`flex items-center px-4 py-2 rounded-md ${imageMethod === 'url' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            title="Use image URL"
                            aria-label="Use image URL"
                          >
                            <FiLink className="mr-2" />
                            Use URL
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImageMethod('upload');
                              setTimeout(() => fileInputRef.current?.click(), 100);
                            }}
                            className={`flex items-center px-4 py-2 rounded-md ${imageMethod === 'upload' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            title="Upload image"
                            aria-label="Upload image"
                          >
                            <FiUpload className="mr-2" />
                            Upload
                          </button>
                          <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/jpeg,image/png,image/gif"
                            title="Upload profile image"
                          />
                        </div>
                        
                        {imageMethod === 'url' && (
                          <div className="space-y-2">
                            <div className="flex">
                              <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter image URL"
                                className="flex-1 px-3 py-2 border rounded-l-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={handleUrlSubmit}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                              >
                                Set
                              </button>
                            </div>
                            <p className="text-xs text-gray-500">
                              Enter a valid URL to an image (JPEG, PNG, GIF)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <button
                        type="button"
                        onClick={() => setEmailPrivacy(!emailPrivacy)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                          emailPrivacy ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                        title={emailPrivacy ? "Make email public" : "Make email private"}
                        aria-label={emailPrivacy ? "Make email public" : "Make email private"}
                      >
                        {emailPrivacy ? (
                          <>
                            <FiEyeOff className="mr-1" size={14} />
                            <span>Show email in profile</span>
                          </>
                        ) : (
                          <>
                            <FiEye className="mr-1" size={14} />
                            <span>Hide email in profile</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 text-gray-500">
                      <FiMail className="mr-2" />
                      <span>{user?.email}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {emailPrivacy 
                        ? "Your email will be hidden from other users" 
                        : "Your email will be visible to other users"}
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
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your account settings and preferences
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Account Type</h4>
                        <p className="text-sm text-gray-500">
                          {userData?.role === 'admin' ? 'Administrator' : 'Standard User'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email Privacy</h4>
                        <p className="text-sm text-gray-500">
                          {emailPrivacy ? 'Your email is hidden from other users' : 'Your email is visible to other users'}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={toggleEmailPrivacy}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            !emailPrivacy ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              !emailPrivacy ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Account Created</h4>
                        <p className="text-sm text-gray-500">
                          {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 