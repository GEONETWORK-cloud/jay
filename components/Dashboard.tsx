"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import ChartSection from "./ChartSection";
import RecentActivity from "./RecentActivity";
import ProjectsList from "./ProjectsList";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { loadDashboardStats, loadRecentActivities, createActivityGraphData, Activity } from "../lib/firebaseService";
import { showNotification } from "../lib/utils";
 
// Types
interface DashboardStats {
  projectsCount: number;
  activitiesCount: number;
  usersCount: number;
  recentActivities: any[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    projectsCount: 0,
    activitiesCount: 0,
    usersCount: 0,
    recentActivities: []
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<{labels: string[], data: number[]}>({
    labels: [],
    data: []
  });
  const [displayName, setDisplayName] = useState('');
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      
      try {
        // Fetch user data from Firestore to get display preferences
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setDisplayName(userData.displayName || '');
          // Get email visibility preference
          setShowEmail(userData.showEmail !== false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [user]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // Load dashboard stats
        const dashboardStats = await loadDashboardStats();
        setStats(dashboardStats);
        
        // Load recent activities
        const recentActivities = await loadRecentActivities(10);
        setActivities(recentActivities);
        
        // Create chart data from activities
        const activityGraphData = createActivityGraphData(dashboardStats.recentActivities as Activity[]);
        setChartData(activityGraphData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        showNotification("Failed to load dashboard data", "error");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Get the appropriate greeting text
  const getGreeting = () => {
    if (displayName) {
      return `Welcome back, ${displayName}`;
    }
    
    if (showEmail && user?.email) {
      return `Welcome back, ${user.email}`;
    }
    
    return 'Welcome back';
  };

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}</h1>
          {showEmail && user.email && (
            <p className="text-gray-600">{user.email}</p>
          )}
        </header>
        
        <StatsCards stats={stats} loading={loading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartSection chartData={chartData} loading={loading} />
          <RecentActivity activities={activities} loading={loading} />
        </div>

        <div className="mt-6">
          <ProjectsList />
        </div>
      </div>
    </div>
  );
} 