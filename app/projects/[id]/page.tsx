'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiEdit, FiX } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate, getCategoryDisplayName } from '@/lib/utils';
import { getProject, updateProject } from '@/lib/firebaseService';

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
  liveLink: string;
  projectLink: string;
  sourceCodeUrl: string;
  createdBy: string;
  createdAt: any;
  updatedAt?: any;
}

interface ProjectData {
  id?: string;
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
  updatedAt?: any;
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    liveLink: '',
    projectLink: '',
    sourceCodeUrl: ''
  });
  const [tags, setTags] = useState<Array<string | TagObject>>([]);
  const [newTag, setNewTag] = useState('');
  const [tagColor, setTagColor] = useState('#3B82F6'); // Default blue color
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const projectData = await getProject(params.id) as ProjectData;
        
        if (!projectData) {
          router.push('/projects');
          return;
        }
        
        // Ensure all required properties are present
        const completeProjectData: Project = {
          id: projectData.id || params.id,
          title: projectData.title || '',
          description: projectData.description || '',
          category: projectData.category || '',
          tags: projectData.tags || [],
          imageUrl: projectData.imageUrl || '',
          liveLink: projectData.liveLink || '',
          projectLink: projectData.projectLink || '',
          sourceCodeUrl: projectData.sourceCodeUrl || '',
          createdBy: projectData.createdBy || '',
          createdAt: projectData.createdAt || new Date(),
          updatedAt: projectData.updatedAt
        };
        
        setProject(completeProjectData);
        setTags(completeProjectData.tags);
        setFormData({
          title: completeProjectData.title,
          description: completeProjectData.description,
          category: completeProjectData.category,
          imageUrl: completeProjectData.imageUrl,
          liveLink: completeProjectData.liveLink,
          projectLink: completeProjectData.projectLink,
          sourceCodeUrl: completeProjectData.sourceCodeUrl
        });
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProject();
    } else {
      router.push('/login');
    }
  }, [params.id, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!project) return;
    
    try {
      setSaving(true);
      
      // Update project with new data
      const updateData: Partial<Project> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
        liveLink: formData.liveLink,
        projectLink: formData.projectLink,
        sourceCodeUrl: formData.sourceCodeUrl,
        tags: tags
      };
      
      await updateProject(project.id, updateData);
      
      // Update local state
      setProject(prev => {
        if (!prev) return null;
        return {
          ...prev,
          ...updateData
        };
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    // Create new tag object
    const newTagObj = {
      name: newTag.trim(),
      color: tagColor.replace('#', '')
    };
    
    // Add new tag
    setTags(prev => [...prev, newTagObj]);
    
    // Reset inputs
    setNewTag('');
  };

  const handleRemoveTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
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

  const formatProjectDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    try {
      // Handle Firestore Timestamp
      if (timestamp && typeof timestamp.toDate === 'function') {
        return formatDate(timestamp.toDate());
      }
      
      // Handle timestamp as seconds or milliseconds
      if (typeof timestamp === 'number') {
        const date = new Date(timestamp * (timestamp < 10000000000 ? 1000 : 1));
        return formatDate(date);
      }
      
      // Handle string date
      if (typeof timestamp === 'string') {
        return formatDate(new Date(timestamp));
      }
      
      // Default fallback
      return formatDate(new Date(timestamp));
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
            <button 
              onClick={() => router.push('/projects')}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/projects')}
              className="mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
              title="Back to projects"
              aria-label="Back to projects"
            >
              <FiArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {editMode ? 'Edit Project' : 'Project Details'}
            </h1>
          </div>
          
          <div>
            {editMode ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50"
                  disabled={saving}
                  title="Cancel editing"
                  aria-label="Cancel editing"
                >
                  <FiX size={16} />
                  <span>Cancel</span>
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-600 disabled:opacity-70"
                  disabled={saving}
                  title="Save changes"
                  aria-label="Save changes"
                >
                  <FiSave size={16} />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-600"
                title="Edit project"
                aria-label="Edit project"
              >
                <FiEdit size={16} />
                <span>Edit Project</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-64 overflow-hidden relative">
            {editMode ? (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg w-full max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter image URL"
                    title="Image URL"
                    aria-label="Image URL"
                  />
                </div>
              </div>
            ) : null}
            <img 
              src={project.imageUrl || 'https://via.placeholder.com/1200x400?text=No+Image'} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            {editMode ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter project title"
                    title="Project title"
                    aria-label="Project title"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    title="Project category"
                    aria-label="Project category"
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="design">UI/UX Design</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="music">Music Production</option>
                    <option value="shop">Shop Items</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter project description"
                    title="Project description"
                    aria-label="Project description"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                  <input
                    id="liveLink"
                    type="text"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="https://example.com/demo"
                    title="Live demo URL"
                    aria-label="Live demo URL"
                  />
                </div>

                <div>
                  <label htmlFor="projectLink" className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                  <input
                    id="projectLink"
                    type="text"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="https://example.com/project"
                    title="Project link"
                    aria-label="Project link"
                  />
                </div>

                <div>
                  <label htmlFor="sourceCodeUrl" className="block text-sm font-medium text-gray-700 mb-1">Source Code URL</label>
                  <input
                    id="sourceCodeUrl"
                    type="text"
                    name="sourceCodeUrl"
                    value={formData.sourceCodeUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="https://github.com/username/repo"
                    title="Source code URL"
                    aria-label="Source code URL"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                      <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <span className="text-sm text-gray-700 mr-1">
                          {getTagDisplay(tag)}
                        </span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-gray-500 hover:text-red-500"
                          title="Remove tag"
                          aria-label="Remove tag"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      id="newTag"
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add a tag"
                      className="flex-1 p-2 border border-gray-300 rounded-l"
                      title="New tag"
                      aria-label="New tag"
                    />
                    <input 
                      id="tagColor"
                      type="color"
                      value={tagColor}
                      onChange={(e) => setTagColor(e.target.value)}
                      className="w-12 border border-gray-300 border-l-0"
                      title="Tag color"
                      aria-label="Tag color"
                    />
                    <button 
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-r hover:bg-indigo-600"
                      title="Add tag"
                      aria-label="Add tag"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
                <p className="text-gray-500 mb-4">{getCategoryDisplayName(project.category)}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {getTagDisplay(tag)}
                    </span>
                  ))}
                </div>
                
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  {project.liveLink && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Live Demo</h3>
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {project.liveLink}
                      </a>
                    </div>
                  )}
                  
                  {project.projectLink && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Project Link</h3>
                      <a 
                        href={project.projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {project.projectLink}
                      </a>
                    </div>
                  )}
                  
                  {project.sourceCodeUrl && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Source Code</h3>
                      <a 
                        href={project.sourceCodeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {project.sourceCodeUrl}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-500">
                  Created: {formatProjectDate(project.createdAt)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 