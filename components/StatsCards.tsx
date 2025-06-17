import { useEffect, useRef } from "react";
import { FiShoppingCart, FiActivity } from "react-icons/fi";
import { animateValue } from "@/lib/utils";
  
interface StatsCardsProps {
  stats: {
    projectsCount: number;
    activitiesCount: number;
    usersCount: number;
  };
  loading: boolean;
}

interface StatItem {
  title: string;
  value: number;
  ref: React.RefObject<HTMLHeadingElement>;
  change: string;
  icon: JSX.Element;
  color: string;
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  const projectsRef = useRef<HTMLHeadingElement>(null);
  const activitiesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!loading) {
      // Animate stats counters
      if (projectsRef.current) {
        animateValue(0, stats.projectsCount, 1000, (value) => {
          if (projectsRef.current) projectsRef.current.textContent = value.toString();
        });
      }
      
      if (activitiesRef.current) {
        animateValue(0, stats.activitiesCount, 1000, (value) => {
          if (activitiesRef.current) activitiesRef.current.textContent = value.toString();
        });
      }
    }
  }, [stats, loading]);

  // Helper function to get the appropriate color classes
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-500';
      case 'green':
        return 'bg-green-100 text-green-500';
      case 'purple':
        return 'bg-purple-100 text-purple-500';
      case 'orange':
        return 'bg-orange-100 text-orange-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const statsData: StatItem[] = [
    { 
      title: "Total Projects", 
      value: stats.projectsCount,
      ref: projectsRef, 
      change: `+${Math.floor(stats.projectsCount * 0.08)}%`, 
      icon: <FiShoppingCart size={24} />, 
      color: "green" 
    },
    { 
      title: "Activities", 
      value: stats.activitiesCount,
      ref: activitiesRef, 
      change: `+${Math.floor(stats.activitiesCount * 0.12)}%`, 
      icon: <FiActivity size={24} />, 
      color: "orange" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium">{stat.title}</p>
              <h3 ref={stat.ref} className="text-2xl font-bold mt-1">
                {loading ? (
                  <div className="h-7 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  stat.value || "0"
                )}
              </h3>
              <span className="text-green-500 text-sm font-medium">
                {loading ? (
                  <div className="h-4 w-12 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  stat.change
                )}
              </span>
            </div>
            <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 