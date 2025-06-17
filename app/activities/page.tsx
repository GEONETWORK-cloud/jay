'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiActivity, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiLogIn, 
  FiLogOut,
  FiFilter,
  FiSearch,
  FiCalendar
} from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { formatTimeAgo } from '@/lib/utils';
import { loadAllActivities, getUserDisplayName } from '@/lib/firebaseService';

interface TagObject {
  name: string;
  color: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  userId: string;
  timestamp: any;
  tags?: Array<string | TagObject>;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        router.push('/login');
        return;
      }
      
      try {
        setLoading(true);
        const allActivities = await loadAllActivities();
        
        const userIds = Array.from(new Set(allActivities.map(a => a.userId)));
        const names: Record<string, string> = {};
        
        for (const userId of userIds) {
          const displayName = await getUserDisplayName(userId);
          names[userId] = displayName;
        }
        
        setUserNames(names);
      } catch (error) {
        console.error('Error loading activities:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user, router]);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'create':
        return <FiPlus size={16} className="text-green-500" />;
      case 'update':
        return <FiEdit size={16} className="text-blue-500" />;
      case 'delete':
        return <FiTrash2 size={16} className="text-red-500" />;
      case 'view':
        return <FiEye size={16} className="text-purple-500" />;
      case 'login':
        return <FiLogIn size={16} className="text-indigo-500" />;
      case 'logout':
        return <FiLogOut size={16} className="text-orange-500" />;
      default:
        return <FiActivity size={16} className="text-gray-500" />;
    }
  };

  const getTagDisplay = (tag: string | TagObject | any): string => {
    if (typeof tag === 'string') {
      return tag;
    }
    if (tag && typeof tag === 'object') {
      return tag.name || '';
    }
    return '';
  };

  const getTagColorClass = (tag: string | TagObject | any): string => {
    if (typeof tag === 'string') {
      return 'bg-gray-100 text-gray-600';
    }
    if (tag && typeof tag === 'object' && tag.color) {
      const colorMap: Record<string, string> = {
        'blue': 'bg-blue-100 text-blue-600',
        'green': 'bg-green-100 text-green-600',
        'purple': 'bg-purple-100 text-purple-600',
        'orange': 'bg-orange-100 text-orange-600',
        'red': 'bg-red-100 text-red-600',
        'yellow': 'bg-yellow-100 text-yellow-600',
        'indigo': 'bg-indigo-100 text-indigo-600',
        'pink': 'bg-pink-100 text-pink-600',
      };
      return colorMap[tag.color] || 'bg-gray-100 text-gray-600';
    }
    return 'bg-gray-100 text-gray-600';
  };

  // Format timestamp properly
  const formatActivityTime = (timestamp: any): string => {
    if (!timestamp) return 'Unknown time';
    
    try {
      // Handle Firestore Timestamp
      if (timestamp && typeof timestamp.toDate === 'function') {
        return formatTimeAgo(timestamp.toDate());
      }
      
      // Handle date object
      if (timestamp instanceof Date) {
        return formatTimeAgo(timestamp);
      }
      
      // Handle timestamp as seconds or milliseconds
      if (typeof timestamp === 'number') {
        const date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
        return formatTimeAgo(date);
      }
      
      // Handle string date
      if (typeof timestamp === 'string') {
        return formatTimeAgo(new Date(timestamp));
      }
      
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting timestamp:', error, timestamp);
      return 'Invalid date';
    }
  };

  // Filter activities based on search and type filter
  const filteredActivities = activities
    .filter(activity => {
      if (typeFilter !== 'all' && activity.type.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }
      
      const matchesSearch = 
        searchTerm === '' || 
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (userNames[activity.userId] || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Convert timestamps to dates for comparison
      const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
      const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Activities</h1>
          <p className="text-gray-600">View and track all user activities across the platform</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <FiFilter className="text-gray-500" />
              <select 
                className="border rounded-lg p-2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="view">View</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 flex justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredActivities.length > 0 ? (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" size={14} />
                          <span>Time</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredActivities.map(activity => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 mr-3">
                              {getIcon(activity.type)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {activity.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{userNames[activity.userId] || activity.userId}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{activity.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {activity.tags && activity.tags.length > 0 ? (
                              <>
                                {activity.tags.slice(0, 3).map((tag, idx) => (
                                  <span 
                                    key={idx} 
                                    className={`text-xs px-2 py-1 rounded-full ${getTagColorClass(tag)}`}
                                  >
                                    {getTagDisplay(tag)}
                                  </span>
                                ))}
                                {activity.tags.length > 3 && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    +{activity.tags.length - 3}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">No tags</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatActivityTime(activity.timestamp)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mb-4">
                  <FiActivity size={48} className="text-gray-300 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No activities found</h3>
                <p className="text-gray-500">Try changing your search criteria or check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 