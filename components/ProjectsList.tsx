"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiExternalLink, FiTrash2, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { loadProjects, deleteProject } from '@/lib/firebaseService';
import { formatDate, getCategoryDisplayName, getCategoryIcon } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface TagObject {
  name: string;
  color: string;
}
 
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: Array<string | TagObject>;
  imageUrl: string;
  createdBy: string;
  createdAt: any;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { user } = useAuth();
  const router = useRouter();

  // Helper function 
  const getTagDisplay = (tag: string | TagObject | any): string => {
    if (typeof tag === 'string') {
      return tag;
    }
    if (tag && typeof tag === 'object') {
      // Handle tag objects 
      return tag.name || '';
    }
    return '';
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const projectsList = (await loadProjects()).map(p => ({
          ...p,
          id: p.id ?? '', // fallback to empty string if undefined
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        // Remove from state
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const filteredProjects = categoryFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === categoryFilter);

  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];

  // Scroll projects container
  const scrollProjects = (direction: 'left' | 'right') => {
    const container = document.getElementById('projects-container');
    if (container) {
      const scrollAmount = 300;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded text-sm ${
                categoryFilter === category 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setCategoryFilter(category)}
              title={`Filter by ${category === 'all' ? 'all categories' : getCategoryDisplayName(category)}`}
            >
              {category === 'all' ? 'All' : getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="relative">
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-10 hover:bg-gray-100"
              onClick={() => scrollProjects('left')}
              title="Scroll left"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <div 
              id="projects-container"
              className="flex overflow-x-auto py-4 px-2 space-x-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={project.imageUrl || 'https://via.placeholder.com/300x150?text=No+Image'} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold">{project.title}</h4>
                          <p className="text-sm text-gray-500">{getCategoryDisplayName(project.category)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-500 hover:text-blue-700" title="Edit project">
                            <FiEdit size={18} />
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProject(project.id)}
                            title="Delete project"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                          >
                            {getTagDisplay(tag)}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500">
                        {formatDate(project.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-500">
                  No projects found. {categoryFilter !== 'all' && 'Try changing the category filter.'}
                </div>
              )}
            </div>
            
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-10 hover:bg-gray-100"
              onClick={() => scrollProjects('right')}
              title="Scroll right"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
          
          <div className="mt-4 text-right">
            <button 
              onClick={() => router.push('/projects')}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-end space-x-1 ml-auto"
              title="View all projects"
            >
              <span>View all projects</span>
              <span className="text-lg">→</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
} 