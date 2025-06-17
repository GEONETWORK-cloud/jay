// Utility functions extracted from dashboard.js

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Shows a notification message to the user
 * @param message - The notification message
 * @param type - Type of notification (info, success, error, warning)
 */
export function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
  // This is just a placeholder for the actual implementation
  console.log(`[${type}] ${message}`)
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago")
 * @param date - Date object or timestamp
 */
export function formatTimeAgo(date: Date | number | string): string {
  try {
    const now = new Date();
    const pastDate = new Date(date);
    
    // Check if date is valid
    if (isNaN(pastDate.getTime())) {
      return 'recently';
    }
    
    const diff = now.getTime() - pastDate.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    if (days < 30) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return 'recently';
  }
}

/**
 * Format a date to a readable string
 * @param timestamp - Timestamp or Date object
 */
export function formatDate(timestamp: number | string | Date): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get an icon name for different activity types
 * @param type - The activity type
 */
export function getActivityIcon(type: string): string {
  switch (type.toLowerCase()) {
    case 'create':
      return 'plus-circle';
    case 'update':
      return 'edit';
    case 'delete':
      return 'trash';
    case 'login':
      return 'log-in';
    case 'logout':
      return 'log-out';
    case 'view':
      return 'eye';
    default:
      return 'activity';
  }
}

/**
 * Get a display name for different categories
 * @param category - The category
 */
export function getCategoryDisplayName(category: string): string {
  const categories: Record<string, string> = {
    'web': 'Web Development',
    'mobile': 'Mobile App',
    'design': 'UI/UX Design',
    'analytics': 'Data Analytics',
    'marketing': 'Digital Marketing',
    'music': 'Music Production',
    'shop': 'Shop Items'
  };
  
  return categories[category.toLowerCase()] || category;
}

/**
 * Animate counting from one value to another
 * @param startValue - Starting value
 * @param endValue - Ending value
 * @param duration - Animation duration in milliseconds
 * @param callback - Callback function that receives the current value
 */
export function animateValue(
  startValue: number, 
  endValue: number, 
  duration: number, 
  callback: (value: number) => void
): void {
  let start: number | null = null;
  
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const value = Math.floor(progress * (endValue - startValue) + startValue);
    
    callback(value);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      callback(endValue);
    }
  }
  
  window.requestAnimationFrame(step);
}

/**
 * Get icon name for a category
 * @param category - The category name
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'web': 'globe',
    'mobile': 'smartphone',
    'design': 'pen-tool',
    'analytics': 'bar-chart-2',
    'marketing': 'trending-up',
    'music': 'music',
    'shop': 'shopping-bag'
  };
  
  return icons[category.toLowerCase()] || 'folder';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 