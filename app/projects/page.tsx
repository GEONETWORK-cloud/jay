'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadProjects, deleteProject } from '@/lib/firebaseService';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiGrid, FiList, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

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
  liveLink?: string;
  projectLink?: string;
  sourceCodeUrl?: string;
  createdBy: string;
  createdAt: any;
}

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setIsAnimating(true);
        const projectsList = (await loadProjects()).map(p => ({
          ...p,
          id: p.id ?? '', // fallback to empty string if undefined
        }));
        setProjects(projectsList);
        // Reset animation state after all cards have appeared
        setTimeout(() => {
          setIsAnimating(false);
        }, projectsList.length * 200 + 100); // 200ms per card + 100ms buffer
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProjects();
    } else {
      router.push('/login');
    }
  }, [user, router]);

  const handleDelete = async (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        setDeletingId(projectId);
        await deleteProject(projectId);
        setProjects(projects.filter(p => p.id !== projectId));
        toast.success('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/')}
              className="mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
              title="Back to dashboard"
              aria-label="Back to dashboard"
            >
              <FiArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">All Projects</h1>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href="/projects/create"
              className="p-2 px-4 rounded bg-indigo-500 text-white flex items-center gap-2 hover:bg-indigo-600"
            >
              <FiPlusCircle size={18} />
              <span>Add Project</span>
            </Link>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600'}`}
              title="Grid view"
              aria-label="Grid view"
            >
              <FiGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600'}`}
              title="List view"
              aria-label="List view"
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div 
                  key={project.id}
                  className={viewMode === 'list' ? "bg-white rounded-lg shadow p-4" : ""}
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                    animation: isAnimating ? `popIn 0.3s ease-out ${index * 0.2}s forwards` : 'none'
                  }}
                >
                  {/* Render project in either grid or list view */}
                  {viewMode === 'grid' ? (
                    <div 
                      className="bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg relative group"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={project.imageUrl || 'https://via.placeholder.com/300x150?text=No+Image'} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        disabled={deletingId === project.id}
                      >
                        {deletingId === project.id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiTrash2 size={16} />
                        )}
                      </button>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold">{project.title}</h2>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag, index) => {
                            const tagName = typeof tag === 'string' ? tag : tag.name;
                            return (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                              >
                                {tagName}
                              </span>
                            );
                          })}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex cursor-pointer transition-all hover:bg-gray-50 relative group"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      <div className="w-20 h-20 mr-4 overflow-hidden rounded">
                        <img 
                          src={project.imageUrl || 'https://via.placeholder.com/300x150?text=No+Image'} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg font-semibold">{project.title}</h2>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{project.description}</p>
                          </div>
                          <button
                            onClick={(e) => handleDelete(project.id, e)}
                            className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                            disabled={deletingId === project.id}
                          >
                            {deletingId === project.id ? (
                              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FiTrash2 size={16} />
                            )}
                          </button>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map((tag, index) => {
                            const tagName = typeof tag === 'string' ? tag : tag.name;
                            return (
                              <span 
                                key={index} 
                                className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full"
                              >
                                {tagName}
                              </span>
                            );
                          })}
                          {project.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full">
                              +{project.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-12 bg-white rounded-lg">
                <p className="text-gray-500 mb-4">No projects found</p>
                <Link 
                  href="/projects/create"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2 mx-auto inline-flex"
                >
                  <FiPlusCircle size={18} />
                  <span>Create Your First Project</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
} 