"use client";

import { useEffect, useState } from 'react';
import { FiActivity, FiPlus, FiEdit, FiTrash2, FiEye, FiLogIn, FiLogOut } from 'react-icons/fi';
import { formatTimeAgo, getActivityIcon } from '@/lib/utils';
import { getUserDisplayName } from '@/lib/firebaseService';

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

interface RecentActivityProps {
  activities: Activity[];
  loading: boolean;
}

export default function RecentActivity({ activities, loading }: RecentActivityProps) {
  const [userNames, setUserNames] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchUserNames() {
      const names: Record<string, string> = {};
      
      for (const activity of activities) {
        if (!names[activity.userId]) {
          names[activity.userId] = await getUserDisplayName(activity.userId);
        }
      }
      
      setUserNames(names);
    }
    
    if (activities.length > 0) {
      fetchUserNames();
    }
  }, [activities]);

  // Function to format Firestore timestamp or fallback to a reasonable time string
  const formatActivityTime = (timestamp: any): string => {
    // Check if it's a Firestore Timestamp object
    if (timestamp && typeof timestamp === 'object' && timestamp.seconds && timestamp.nanoseconds) {
      // Convert Firestore timestamp to Date
      const date = new Date(timestamp.seconds * 1000);
      return formatTimeAgo(date);
    }
    
    // For demo purposes, return a random time between 1-60 minutes ago
    const randomMinutes = Math.floor(Math.random() * 60) + 1; 
    return `${randomMinutes} ${randomMinutes === 1 ? 'minute' : 'minutes'} ago`;
  };

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

  // Helper function to get the tag display value
  const getTagDisplay = (tag: string | TagObject | any): string => {
    if (typeof tag === 'string') {
      return tag;
    }
    if (tag && typeof tag === 'object') {
      // Handle tag objects regardless of property order
      return tag.name || '';
    }
    return '';
  };

  // Helper function to get tag background color
  const getTagColor = (tag: string | TagObject | any): string => {
    if (typeof tag === 'string') {
      return 'bg-gray-100';
    }
    if (tag && typeof tag === 'object' && tag.color) {
      const colorMap: Record<string, string> = {
        'blue': 'bg-blue-100',
        'green': 'bg-green-100',
        'purple': 'bg-purple-100',
        'orange': 'bg-orange-100',
        'red': 'bg-red-100',
        'yellow': 'bg-yellow-100',
        'indigo': 'bg-indigo-100',
        'pink': 'bg-pink-100',
      };
      return colorMap[tag.color] || 'bg-gray-100';
    }
    return 'bg-gray-100';
  };

  // Helper function to get tag text color
  const getTagTextColor = (tag: string | TagObject | any): string => {
    if (typeof tag === 'string') {
      return 'text-gray-600';
    }
    if (tag && typeof tag === 'object' && tag.color) {
      const colorMap: Record<string, string> = {
        'blue': 'text-blue-600',
        'green': 'text-green-600',
        'purple': 'text-purple-600',
        'orange': 'text-orange-600',
        'red': 'text-red-600',
        'yellow': 'text-yellow-600',
        'indigo': 'text-indigo-600',
        'pink': 'text-pink-600',
      };
      return colorMap[tag.color] || 'text-gray-600';
    }
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {getIcon(activity.type)}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{userNames[activity.userId] || 'User'}</span>{" "}
                  {activity.description}
                </p>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500">{formatActivityTime(activity.timestamp)}</p>
                  
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="flex ml-2">
                      {activity.tags.slice(0, 2).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs ${getTagColor(tag)} ${getTagTextColor(tag)} px-2 py-0.5 rounded-full ml-1`}
                        >
                          {getTagDisplay(tag)}
                        </span>
                      ))}
                      {activity.tags.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-1">
                          +{activity.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No recent activity
          </div>
        )}
      </div>
      
      <button className="mt-4 text-indigo-600 text-sm hover:text-indigo-800">
        View all activity →
      </button>
    </div>
  );
} 