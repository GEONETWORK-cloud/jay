"use client";
 
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiSettings, 
  FiCalendar, 
  FiLogOut, 
  FiFolder,
  FiActivity,
  FiShoppingBag,
  FiMusic,
  FiLayers,
  FiPlusCircle,
  FiUsers
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createHash } from 'crypto';

interface UserData {
  name: string;
  email: string;
  avatar: string;
  showEmail: boolean;
  emailPrivacy: boolean;
  notifications: boolean;
  privacy: string;
  theme: string;
  username: string;
  updatedAt: Date | null;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData>({
    name: 'User',
    email: '',
    avatar: 'https://via.placeholder.com/40',
    showEmail: true,
    emailPrivacy: false,
    notifications: false,
    privacy: 'public',
    theme: 'dark',
    username: '',
    updatedAt: null
  });

  // Function to get Gravatar URL from email
  const getGravatarUrl = (email: string) => {
    if (!email) return 'https://via.placeholder.com/40';
    
    const hash = createHash('md5')
      .update(email.toLowerCase().trim())
      .digest('hex');
      
    return `https://www.gravatar.com/avatar/${hash}?s=40&d=mp`;
  };

  // Function to mask email
  const maskEmail = (email: string) => {
    if (!email) return "**********@gmail.com";
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      
      
      const gravatarUrl = user.email ? getGravatarUrl(user.email) : 'https://via.placeholder.com/40';
      
      
      const initialData = {
        name: user.displayName || 'User',
        email: user.email || '',
        avatar: user.photoURL || gravatarUrl,
        showEmail: true,
        emailPrivacy: false,
        notifications: false,
        privacy: 'public',
        theme: 'dark',
        username: '',
        updatedAt: null
      };
      
      setUserData(initialData);
      
      try {
        
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const firestoreData = userSnap.data();
          
         
          setUserData({
            name: firestoreData.displayName || initialData.name,
            email: user.email || '', 
            avatar: firestoreData.photoURL || user.photoURL || gravatarUrl,
            showEmail: firestoreData.showEmail !== false,
            emailPrivacy: firestoreData.emailPrivacy === true,
            notifications: firestoreData.notifications === true,
            privacy: firestoreData.privacy || 'public',
            theme: firestoreData.theme || 'dark',
            username: firestoreData.username || '',
            updatedAt: firestoreData.updatedAt || null
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    
    fetchUserData();
  }, [user]);
  
  const menuItems = [
    { icon: <FiHome size={20} />, label: "Dashboard", href: "/" },
    { icon: <FiFolder size={20} />, label: "Projects", href: "/projects" },
    { icon: <FiActivity size={20} />, label: "Activities", href: "/activities" },
    { icon: <FiCalendar size={20} />, label: "Calendar", href: "/calendar" },
  ];

  const categoriesItems = [
    { icon: <FiLayers size={20} />, label: "Categories", href: "/categories" },
    { 
      icon: <FiMusic size={20} />, 
      label: "Music", 
      href: "/music",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/music') {
          e.preventDefault();
          
          window.dispatchEvent(new CustomEvent('initialize-music'));
        }
      }
    },
    { icon: <FiShoppingBag size={20} />, label: "Shop", href: "/shop" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href: string) => {
    if (href === '/projects' && pathname === '/projects/create') {
      return false;
    }
    
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  // Add admin menu items if user is admin
  if (user?.email === 'rennielgeogeanga12@gmail.com') {
    menuItems.push(
      { icon: <FiUsers size={20} />, label: "Users", href: "/users" },
      { icon: <FiSettings size={20} />, label: "Settings", href: "/settings" }
    );
  }

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} h-screen flex flex-col`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button 
          className="p-1 text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      {!collapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-600 mr-3">
              <img 
                src={userData.avatar} 
                alt="User Avatar" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (user?.email) {
                    target.src = getGravatarUrl(user.email);
                  } else {
                    target.src = 'https://via.placeholder.com/40';
                  }
                }}
              />
            </div>
            <div>
              <p className="text-sm font-medium">{userData.username || userData.name}</p>
              <p className="text-xs text-gray-400">
                {userData.emailPrivacy ? maskEmail(userData.email) : userData.email}
              </p>
              {userData.privacy === 'public' && (
                <p className="text-xs text-green-400 mt-1">Public Profile</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <nav className="mt-4 flex-1 overflow-y-auto">
        <div>
          <h3 className={`px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? '•••' : 'MAIN'}
          </h3>
          <ul className="mt-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-4 py-3 ${isActive(item.href) 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'} transition-colors
                    ${collapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  <span className={isActive(item.href) ? 'text-white' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/projects/create"
                className={`flex items-center px-4 py-3 ${isActive('/projects/create') 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'} transition-colors
                  ${collapsed ? 'justify-center' : 'space-x-3'}`}
              >
                <span className={isActive('/projects/create') ? 'text-white' : 'text-gray-400'}>
                  <FiPlusCircle size={20} />
                </span>
                {!collapsed && <span>Create Project</span>}
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className={`px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? '•••' : 'CATEGORIES'}
          </h3>
          <ul className="mt-2">
            {categoriesItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-4 py-3 ${isActive(item.href) 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'} transition-colors
                    ${collapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  <span className={isActive(item.href) ? 'text-white' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/settings"
          className={`flex items-center mb-4 ${isActive('/settings') 
            ? 'bg-indigo-600 text-white' 
            : 'text-gray-300 hover:bg-gray-700'} transition-colors px-4 py-2 rounded
            ${collapsed ? 'justify-center' : 'space-x-3'}`}
        >
          <span className={isActive('/settings') ? 'text-white' : 'text-gray-400'}>
            <FiSettings size={20} />
          </span>
          {!collapsed && <span>Settings</span>}
        </Link>
        <button 
          onClick={handleLogout}
          className={`flex items-center w-full px-4 py-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white transition-colors
            ${collapsed ? 'justify-center' : 'space-x-3'}`}
        >
          <FiLogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}