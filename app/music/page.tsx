'use client';

import { useState, useEffect, useRef } from 'react';
import { FiMusic, FiPlus, FiSearch, FiChevronLeft, FiChevronRight, FiList, FiDisc, FiX, FiInfo, FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, doc, getDoc, addDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import { showNotification } from '@/lib/utils';

interface MusicTag {
  name: string;
  color?: string;
}

interface MusicItem {
  id: string;
  category: 'playlist' | 'track' | 'album';
  spotifyLink: string;
  tags?: MusicTag[];
  userId: string;
  createdAt: any;
  uploaderInfo?: {
    username: string;
  };
}

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#8B5CF6', // purple
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#6366F1', // indigo
  '#F97316', // orange
];

export default function MusicPage() {
  const [loading, setLoading] = useState(true);
  const [allMusic, setAllMusic] = useState<MusicItem[]>([]);
  const [filteredMusic, setFilteredMusic] = useState<MusicItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');
  const { user } = useAuth();
  
  // Add Music Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMusicLink, setNewMusicLink] = useState('');
  const [newMusicCategory, setNewMusicCategory] = useState<'playlist' | 'track' | 'album'>('track');
  const [tags, setTags] = useState<MusicTag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Edit Music Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MusicItem | null>(null);
  const [editMusicLink, setEditMusicLink] = useState('');
  const [editMusicCategory, setEditMusicCategory] = useState<'playlist' | 'track' | 'album'>('track');
  const [editTags, setEditTags] = useState<MusicTag[]>([]);
  const [editTagInput, setEditTagInput] = useState('');
  
  // Delete Confirmation State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MusicItem | null>(null);
  
  const categoryRefs = {
    playlist: useRef<HTMLDivElement>(null),
    track: useRef<HTMLDivElement>(null),
    album: useRef<HTMLDivElement>(null)
  };

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'playlist':
        return <FiList size={18} />;
      case 'track':
        return <FiMusic size={18} />;
      case 'album':
        return <FiDisc size={18} />;
      default:
        return <FiMusic size={18} />;
    }
  };

  // Function to format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    
    try {
      // Handle Firestore Timestamp
      if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      
      // Handle Date object or string
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  // Convert Spotify link to embed URL
  const getSpotifyEmbed = (spotifyLink: string) => {
    if (!spotifyLink) return '';
    
    if (!spotifyLink.includes('embed')) {
      return spotifyLink
        .replace('/track/', '/embed/track/')
        .replace('/playlist/', '/embed/playlist/')
        .replace('/album/', '/embed/album/');
    }
    
    return spotifyLink;
  };

  // Function to load music from Firestore
  const fetchMusicData = async () => {
    try {
      setLoading(true);
      
      const musicQuery = query(
        collection(db, 'music'),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(musicQuery);
      
      if (snapshot.empty) {
        setAllMusic([]);
        setFilteredMusic([]);
        setLoading(false);
        return;
      }
      
      // Process music data with uploader info
      const musicData = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const music = { 
            id: docSnapshot.id, 
            ...docSnapshot.data() 
          } as MusicItem;
          
          try {
            if (music.userId) {
              const userDoc = await getDoc(doc(db, 'users', music.userId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                music.uploaderInfo = {
                  username: userData.displayName || userData.username || 'Unknown User'
                };
              } else {
                music.uploaderInfo = { username: 'Unknown User' };
              }
            } else {
              music.uploaderInfo = { username: 'Unknown User' };
            }
          } catch (error) {
            console.warn('Error fetching user info:', error);
            music.uploaderInfo = { username: 'Unknown User' };
          }
          
          return music;
        })
      );
      
      setAllMusic(musicData);
      filterMusic(musicData, currentCategory, searchQuery);
      showNotification('Music loaded successfully', 'success');
    } catch (error) {
      console.error('Error loading music:', error);
      showNotification('Failed to load music data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter music based on category and search term
  const filterMusic = (music: MusicItem[], category: string, search: string) => {
    let filtered = [...music];
    
    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(item => 
        (item.uploaderInfo?.username?.toLowerCase().includes(searchLower)) ||
        item.category.toLowerCase().includes(searchLower) ||
        (item.tags && item.tags.some(tag => tag.name.toLowerCase().includes(searchLower)))
      );
    }
    
    setFilteredMusic(filtered);
  };

  // Handle category filter click
  const handleCategoryFilter = (category: string) => {
    setCurrentCategory(category);
    filterMusic(allMusic, category, searchQuery);
  };

  // Handle search input
  const handleSearch = (search: string) => {
    setSearchQuery(search);
    filterMusic(allMusic, currentCategory, search);
  };

  // Handle horizontal scroll for category sections
  const handleScroll = (category: 'playlist' | 'track' | 'album', direction: 'left' | 'right') => {
    const container = categoryRefs[category]?.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Add tag to the new music form
  const addTag = () => {
    if (tagInput.trim() && tags.length < 5) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setTags([...tags, { name: tagInput.trim(), color: randomColor }]);
      setTagInput('');
    }
  };
  
  // Remove tag from the new music form
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  
  // Add music submission
  const handleAddMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!user) {
      setFormError('You must be logged in to add music');
      return;
    }
    
    // Validate the Spotify link
    if (!newMusicLink.trim() || 
        !newMusicLink.includes('spotify.com')) {
      setFormError('Please enter a valid Spotify link');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create the new music object
      const newMusic = {
        category: newMusicCategory,
        spotifyLink: newMusicLink.trim(),
        tags: tags,
        userId: user.uid,
        createdAt: serverTimestamp()
      };
      
      // Add to Firestore
      await addDoc(collection(db, 'music'), newMusic);
      
      // Reset form and close modal
      setNewMusicLink('');
      setNewMusicCategory('track');
      setTags([]);
      setIsModalOpen(false);
      
      // Show success notification
      showNotification('Music added successfully!', 'success');
      
      // Refresh the music data
      fetchMusicData();
    } catch (error) {
      console.error('Error adding music:', error);
      setFormError('Failed to add music. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open edit modal and populate with item data
  const handleOpenEditModal = (item: MusicItem) => {
    setEditingItem(item);
    setEditMusicLink(item.spotifyLink);
    setEditMusicCategory(item.category);
    setEditTags(item.tags || []);
    setIsEditModalOpen(true);
  };
  
  // Add tag to the edit form
  const addEditTag = () => {
    if (editTagInput.trim() && editTags.length < 5) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setEditTags([...editTags, { name: editTagInput.trim(), color: randomColor }]);
      setEditTagInput('');
    }
  };
  
  // Remove tag from the edit form
  const removeEditTag = (index: number) => {
    const newTags = [...editTags];
    newTags.splice(index, 1);
    setEditTags(newTags);
  };
  
  // Edit music submission
  const handleEditMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!user || !editingItem) {
      setFormError('You must be logged in to edit music');
      return;
    }
    
    // Validate the Spotify link
    if (!editMusicLink.trim() || 
        !editMusicLink.includes('spotify.com')) {
      setFormError('Please enter a valid Spotify link');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create the updated music object
      const updatedMusic = {
        category: editMusicCategory,
        spotifyLink: editMusicLink.trim(),
        tags: editTags,
        // Keep original userId and createdAt, add updatedAt
        updatedAt: serverTimestamp()
      };
      
      // Update in Firestore
      const musicDocRef = doc(db, 'music', editingItem.id);
      await updateDoc(musicDocRef, updatedMusic);
      
      // Reset form and close modal
      setEditingItem(null);
      setIsEditModalOpen(false);
      
      // Show success notification
      showNotification('Music updated successfully!', 'success');
      
      // Refresh the music data
      fetchMusicData();
    } catch (error) {
      console.error('Error updating music:', error);
      setFormError('Failed to update music. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle delete confirmation
  const handleOpenDeleteModal = (item: MusicItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };
  
  // Delete music item
  const handleDeleteMusic = async () => {
    if (!itemToDelete) return;
    
    try {
      setSubmitting(true);
      
      // Delete from Firestore
      const musicDocRef = doc(db, 'music', itemToDelete.id);
      await deleteDoc(musicDocRef);
      
      // Reset state and close modal
      setItemToDelete(null);
      setIsDeleteModalOpen(false);
      
      // Show success notification
      showNotification('Music deleted successfully!', 'success');
      
      // Refresh the music data
      fetchMusicData();
    } catch (error) {
      console.error('Error deleting music:', error);
      showNotification('Failed to delete music. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Initialize music data on component mount
  useEffect(() => {
    if (user) {
      fetchMusicData();
    }
  }, [user]);

  // Initialize music functionality when the event is triggered
  useEffect(() => {
    const handleInitializeMusic = () => {
      fetchMusicData();
    };

    window.addEventListener('initialize-music', handleInitializeMusic);
    
    return () => {
      window.removeEventListener('initialize-music', handleInitializeMusic);
    };
  }, []);

  // Group music by category
  const groupedMusic = filteredMusic.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, MusicItem[]>);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Music Collection</h1>
            <p className="text-gray-600">Browse and manage your Spotify tracks, playlists, and albums</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow"
          >
            <FiPlus className="mr-2" />
            <span>Add Music</span>
          </button>
        </div>

        {/* Filter and search bar */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
            <div className="relative w-full md:w-1/3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by uploader, category, or tags..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentCategory === 'all' 
                    ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryFilter('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
                  currentCategory === 'playlist' 
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryFilter('playlist')}
              >
                <FiList className="mr-1" /> Playlists
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
                  currentCategory === 'track' 
                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryFilter('track')}
              >
                <FiMusic className="mr-1" /> Tracks
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
                  currentCategory === 'album' 
                    ? 'bg-purple-100 text-purple-800 border-2 border-purple-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryFilter('album')}
              >
                <FiDisc className="mr-1" /> Albums
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex justify-center items-center mb-6">
              <div className="animate-pulse flex space-x-3">
                <div className="h-4 w-4 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="h-4 w-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-4 w-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="ml-4 text-gray-700">Loading your music collection...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-100 animate-pulse rounded-lg p-4 h-72">
                  <div className="h-full w-full rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredMusic.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-10 text-center">
            <FiMusic size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              {searchQuery ? 'No music found matching your search' : 'Your music collection is empty'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Try different search terms or clear your filters' 
                : 'Get started by adding your favorite Spotify music'}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow transition duration-200"
            >
              Add Your First Track
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Render each category section */}
            {(['playlist', 'track', 'album'] as const).map(category => {
              if (!groupedMusic[category] || groupedMusic[category].length === 0) return null;
              
              return (
                <div key={category} className="category-section bg-white rounded-lg shadow overflow-hidden">
                  <div className="flex items-center p-4 border-b border-gray-100">
                    <div className={`
                      p-2 rounded-lg mr-3
                      ${category === 'playlist' ? 'bg-blue-100 text-blue-700' : 
                        category === 'track' ? 'bg-green-100 text-green-700' : 
                        'bg-purple-100 text-purple-700'}
                    `}>
                      {getCategoryIcon(category)}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">
                      {category}s ({groupedMusic[category].length})
                    </h2>
                  </div>
                  
                  <div className="relative px-2 py-4 bg-gray-50">
                    {/* Scroll buttons - visible only when content is scrollable */}
                    <button 
                      onClick={() => handleScroll(category, 'left')}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-indigo-600 hover:shadow-lg focus:outline-none transition-all"
                      aria-label="Scroll left"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    
                    <button 
                      onClick={() => handleScroll(category, 'right')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-indigo-600 hover:shadow-lg focus:outline-none transition-all"
                      aria-label="Scroll right"
                    >
                      <FiChevronRight size={24} />
                    </button>
                    
                    {/* Scrollable container */}
                    <div 
                      ref={categoryRefs[category]}
                      className="flex overflow-x-auto py-2 px-8 hide-scrollbar gap-6"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {groupedMusic[category].map(item => (
                        <div key={item.id} className="music-card flex-shrink-0 w-full md:w-[400px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                              <div className={`text-xs uppercase font-semibold px-2 py-1 rounded-full ${
                                category === 'playlist' ? 'bg-blue-100 text-blue-800' :
                                category === 'track' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {category}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                {formatDate(item.createdAt)}
                              </div>
                            </div>
                            
                            <div className="text-sm mb-3 flex items-center text-gray-700">
                              <span className="font-medium">Added by:</span> 
                              <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">{item.uploaderInfo?.username}</span>
                            </div>
                            
                            <div className="spotify-embed rounded-lg overflow-hidden mb-3 border border-gray-200">
                              {item.spotifyLink ? (
                                <iframe 
                                  src={getSpotifyEmbed(item.spotifyLink)}
                                  width="100%" 
                                  height="352" 
                                  frameBorder="0" 
                                  allow="encrypted-media"
                                  className="rounded"
                                  style={{ colorScheme: 'normal' }}
                                />
                              ) : (
                                <div className="h-80 w-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                  <FiMusic size={32} className="mb-2" />
                                  <p>No player available</p>
                                </div>
                              )}
                            </div>
                            
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {item.tags.map((tag, idx) => (
                                  <span 
                                    key={idx} 
                                    className="px-3 py-1 text-xs rounded-full text-white font-medium" 
                                    style={{ 
                                      backgroundColor: tag.color || '#6B7280',
                                    }}
                                  >
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Add edit/delete buttons */}
                            {user && item.userId === user.uid && (
                              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                <button
                                  onClick={() => handleOpenEditModal(item)}
                                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                  aria-label="Edit music"
                                >
                                  <FiEdit size={18} />
                                </button>
                                <button
                                  onClick={() => handleOpenDeleteModal(item)}
                                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                  aria-label="Delete music"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Add Music Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Add Music</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddMusic} className="p-5">
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
                    <FiInfo className="mt-0.5 mr-2 flex-shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="flex space-x-3">
                    <label className={`
                      flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                      ${newMusicCategory === 'track' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="category" 
                        value="track" 
                        className="sr-only"
                        checked={newMusicCategory === 'track'} 
                        onChange={() => setNewMusicCategory('track')} 
                      />
                      <FiMusic className="mr-2" />
                      <span>Track</span>
                    </label>
                    <label className={`
                      flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                      ${newMusicCategory === 'playlist' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="category" 
                        value="playlist" 
                        className="sr-only"
                        checked={newMusicCategory === 'playlist'} 
                        onChange={() => setNewMusicCategory('playlist')} 
                      />
                      <FiList className="mr-2" />
                      <span>Playlist</span>
                    </label>
                    <label className={`
                      flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                      ${newMusicCategory === 'album' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="category" 
                        value="album" 
                        className="sr-only"
                        checked={newMusicCategory === 'album'} 
                        onChange={() => setNewMusicCategory('album')} 
                      />
                      <FiDisc className="mr-2" />
                      <span>Album</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="spotifyLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Spotify Link
                  </label>
                  <input
                    id="spotifyLink"
                    type="text"
                    placeholder="https://open.spotify.com/track/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newMusicLink}
                    onChange={(e) => setNewMusicLink(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Paste a Spotify link to a track, album, or playlist
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (optional)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                      disabled={tags.length >= 5}
                    >
                      Add
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Add up to 5 tags to categorize your music
                  </p>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm text-white"
                          style={{ backgroundColor: tag.color }}
                        >
                          {tag.name}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 focus:outline-none"
                          >
                            <FiX size={16} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting || !newMusicLink}
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">◌</span>
                        Adding...
                      </>
                    ) : 'Add Music'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Edit Music Modal */}
        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Edit Music</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleEditMusic} className="p-5">
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
                    <FiInfo className="mt-0.5 mr-2 flex-shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="editCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="flex space-x-3">
                    <label className={`
                      flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                      ${editMusicCategory === 'track' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="editCategory" 
                        value="track" 
                        className="sr-only"
                        checked={editMusicCategory === 'track'} 
                        onChange={() => setEditMusicCategory('track')} 
                      />
                      <FiMusic className="mr-2" />
                      <span>Track</span>
                    </label>
                    <label className={`
                      flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                      ${editMusicCategory === 'playlist' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="editCategory" 
                        value="playlist" 
                        className="sr-only"
                        checked={editMusicCategory === 'playlist'} 
                        onChange={() => setEditMusicCategory('playlist')} 
                      />
                      <FiList className="mr-2" />
                      <span>Playlist</span>
                    </label>
                    <label className={`
                      flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                      ${editMusicCategory === 'album' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="editCategory" 
                        value="album" 
                        className="sr-only"
                        checked={editMusicCategory === 'album'} 
                        onChange={() => setEditMusicCategory('album')} 
                      />
                      <FiDisc className="mr-2" />
                      <span>Album</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="editSpotifyLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Spotify Link
                  </label>
                  <input
                    id="editSpotifyLink"
                    type="text"
                    placeholder="https://open.spotify.com/track/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editMusicLink}
                    onChange={(e) => setEditMusicLink(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (optional)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={editTagInput}
                      onChange={(e) => setEditTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEditTag())}
                    />
                    <button
                      type="button"
                      onClick={addEditTag}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                      disabled={editTags.length >= 5}
                    >
                      Add
                    </button>
                  </div>
                  
                  {editTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {editTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm text-white"
                          style={{ backgroundColor: tag.color }}
                        >
                          {tag.name}
                          <button
                            type="button"
                            onClick={() => removeEditTag(index)}
                            className="ml-2 focus:outline-none"
                          >
                            <FiX size={16} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting || !editMusicLink}
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">◌</span>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && itemToDelete && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <FiTrash2 className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Delete {itemToDelete.category}</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this {itemToDelete.category}? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMusic}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex-1 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 