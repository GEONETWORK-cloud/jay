import { db } from './firebase';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  Timestamp,
  limit as firestoreLimit
} from 'firebase/firestore';
import { showNotification } from './utils';

// Types
export interface Activity {
  id: string;
  type: string;
  description: string;
  userId: string;
  timestamp: Date;
}

interface TagObject {
  name: string;
  color: string;
}

interface Project {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: Array<string | TagObject>;
  roles?: Array<{name: string; color: string}>;
  imageUrl: string;
  createdBy: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

interface MusicItem {
  id?: string;
  title: string;
  artist: string;
  category: string;
  tags: string[];
  userId: string;
  createdAt: Timestamp | Date;
}

interface ShopItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  createdBy: string;
  createdAt: Timestamp | Date;
}

interface DashboardStats {
  projectsCount: number;
  activitiesCount: number;
  usersCount: number;
  recentActivities: Activity[];
}

// Activity tracking
export async function trackActivity(type: string, description: string, userId: string, tags: string[] = []) {
  try {
    const activityRef = collection(db, 'activities');
    
    await addDoc(activityRef, {
      type,
      description,
      userId,
      timestamp: serverTimestamp(),
      tags
    });
    
    console.log('Activity tracked successfully');
  } catch (error) {
    console.error('Error tracking activity:', error);
    throw error;
  }
}

// Load recent activities
export async function loadRecentActivities(limitCount = 5) {
  try {
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, orderBy('timestamp', 'desc'), firestoreLimit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Activity[];
  } catch (error) {
    console.error('Error loading recent activities:', error);
    throw error;
  }
}

// Load projects
export async function loadProjects() {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error('Error loading projects:', error);
    throw error;
  }
}

// Delete project
export async function deleteProject(projectId: string) {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
    showNotification('Project deleted successfully', 'success');
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    showNotification('Error deleting project', 'error');
    throw error;
  }
}

// Load dashboard stats
export async function loadDashboardStats(): Promise<DashboardStats> {
  try {
    const projectsQuery = query(collection(db, 'projects'));
    const activitiesQuery = query(collection(db, 'activities'));
    const usersQuery = query(collection(db, 'users'));

    const [projectsSnapshot, activitiesSnapshot, usersSnapshot] = await Promise.all([
      getDocs(projectsQuery),
      getDocs(activitiesQuery),
      getDocs(usersQuery)
    ]);

    const recentActivities = activitiesSnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type,
          description: data.description,
          userId: data.userId,
          timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)
        } as Activity;
      })
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);

    return {
      projectsCount: projectsSnapshot.size,
      activitiesCount: activitiesSnapshot.size,
      usersCount: usersSnapshot.size,
      recentActivities
    };
  } catch (error) {
    console.error("Error loading dashboard stats:", error);
    throw error;
  }
}

// Get user display name
export async function getUserDisplayName(userId: string) {
  try {
    // First check if this is a special case user
    if (userId === 'system') {
      return 'System';
    }
    
    // Try to get user from Firestore first
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // Prefer email, then displayName
      if (userData.email) {
        return userData.email;
      }
      if (userData.displayName) {
        return userData.displayName;
      }
    }
    
    // For portfolio purposes, generate a realistic looking email based on the userId
    // This ensures we always display something that looks like an email
    return generatePortfolioEmail(userId);
  } catch (error) {
    console.error('Error getting user display name:', error);
    return generatePortfolioEmail(userId);
  }
}

// Helper function to generate realistic emails for portfolio showcase
function generatePortfolioEmail(userId: string): string {
  // Use common domains for demonstration
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'mail.com', 'example.com'];
  
  // Get a consistent domain based on the userId
  const domainIndex = Math.abs(userId.charCodeAt(0) + (userId.charCodeAt(userId.length - 1) || 0)) % domains.length;
  const domain = domains[domainIndex];
  
  // Create username part from userId
  // For longer IDs, use parts of the ID to make it look like a real email
  let username = '';
  if (userId.length > 20) {
    // Take first 2 chars and last 5 chars to form a username
    const firstPart = userId.substring(0, 2).toLowerCase();
    const lastPart = userId.substring(userId.length - 5).toLowerCase();
    username = `user.${firstPart}${lastPart}`;
  } else {
    username = `user.${userId.toLowerCase()}`;
  }
  
  return `${username}@${domain}`;
}

// Load music items
export async function loadMusicItems() {
  try {
    const musicRef = collection(db, 'music');
    const q = query(musicRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MusicItem[];
  } catch (error) {
    console.error('Error loading music items:', error);
    throw error;
  }
}

// Load shop items
export async function loadShopItems() {
  try {
    const shopRef = collection(db, 'shop');
    const q = query(shopRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ShopItem[];
  } catch (error) {
    console.error('Error loading shop items:', error);
    throw error;
  }
}

// Delete shop item
export async function deleteShopItem(itemId: string) {
  try {
    await deleteDoc(doc(db, 'shop', itemId));
    showNotification('Shop item deleted successfully', 'success');
    return true;
  } catch (error) {
    console.error('Error deleting shop item:', error);
    showNotification('Error deleting shop item', 'error');
    throw error;
  }
}

// Create activity graph data
export function createActivityGraphData(activities: Activity[]) {
  // Group activities by date
  const groupedActivities: Record<string, number> = {};
  
  activities.forEach(activity => {
    if (!activity.timestamp) return;
    
    let date;
    if (activity.timestamp instanceof Timestamp) {
      date = activity.timestamp.toDate();
    } else {
      date = new Date(activity.timestamp);
    }
    
    const dateStr = date.toISOString().split('T')[0];
    
    if (groupedActivities[dateStr]) {
      groupedActivities[dateStr]++;
    } else {
      groupedActivities[dateStr] = 1;
    }
  });
  
  // Sort dates
  const sortedDates = Object.keys(groupedActivities).sort();
  
  // Create data for chart
  const labels = sortedDates.map(date => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  const data = sortedDates.map(date => groupedActivities[date]);
  
  return { labels, data };
}

// Get single project
export async function getProject(projectId: string) {
  try {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);
    
    if (projectSnap.exists()) {
      return {
        id: projectSnap.id,
        ...projectSnap.data()
      } as Project;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting project:', error);
    showNotification('Error loading project details', 'error');
    throw error;
  }
}

// Update project
export async function updateProject(projectId: string, projectData: Partial<Project>) {
  try {
    const projectRef = doc(db, 'projects', projectId);
    
    // Add updated timestamp
    const updateData = {
      ...projectData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(projectRef, updateData);
    showNotification('Project updated successfully', 'success');
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    showNotification('Error updating project', 'error');
    throw error;
  }
}

// Load all activities
export async function loadAllActivities() {
  try {
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Activity[];
  } catch (error) {
    console.error('Error loading all activities:', error);
    throw error;
  }
}

// Load all users
export async function loadUsers() {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error loading users:', error);
    throw error;
  }
}

// Delete a user
export async function deleteUser(userId: string) {
  try {
    // First check if user exists
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    // Delete user document from Firestore
    await deleteDoc(userRef);
    
    // Delete user from Firebase Authentication via API
    try {
      const response = await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from delete API:', errorData);
        // We continue even if auth deletion fails, as the user data is already removed
      }
    } catch (authError) {
      console.error('Error calling auth delete API:', authError);
      // Continue execution even if auth deletion fails
    }
    
    // Track this activity
    await trackActivity(
      'delete',
      'Deleted a user account',
      'system', // Using system as userId since this is an admin action
      ['user', 'account', 'delete']
    );
    
    showNotification('User deleted successfully', 'success');
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    showNotification('Error deleting user', 'error');
    throw error; // Re-throw to allow proper error handling in the UI
  }
}

// Create new project
export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const now = serverTimestamp();
    const projectRef = collection(db, 'projects');
    
    const newProject = {
      ...projectData,
      createdAt: now,
      updatedAt: now
    };
    
    const docRef = await addDoc(projectRef, newProject);
    
    // Convert tags to strings for activity tracking
    const tagStrings = projectData.tags.map(tag => 
      typeof tag === 'string' ? tag : tag.name
    );
    
    // Track this activity
    await trackActivity(
      'create',
      `Created a new project: ${projectData.title}`,
      projectData.createdBy,
      ['project', 'create', ...tagStrings]
    );
    
    showNotification('Project created successfully', 'success');
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    showNotification('Error creating project', 'error');
    throw error;
  }
} 