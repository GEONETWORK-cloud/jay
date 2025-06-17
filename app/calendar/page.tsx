'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import EventForm from '@/components/calendar/EventForm';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiPlus, 
  FiCalendar, 
  FiEdit2,
  FiTrash2
} from 'react-icons/fi';
import { 
  CalendarEvent, 
  loadEventsByMonth, 
  createCalendarEvent, 
  updateCalendarEvent,
  deleteCalendarEvent
} from '@/lib/calendarService';
import { showNotification } from '@/lib/utils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<CalendarEvent> | undefined>(undefined);
  
  const router = useRouter();
  const { user } = useAuth();

  // Get current month details
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Load events for the current month
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchEvents() {
      try {
        setLoading(true);
        const fetchedEvents = await loadEventsByMonth(currentYear, currentMonth);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error loading calendar events:', error);
        showNotification('Failed to load calendar events', 'error');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [currentYear, currentMonth, user, router]);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Event handlers
  const handleAddEvent = () => {
    setSelectedEvent(selectedDate ? { startDate: selectedDate } : undefined);
    setShowEventForm(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteCalendarEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
        showNotification('Event deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting event:', error);
        showNotification('Failed to delete event', 'error');
      }
    }
  };

  const handleSaveEvent = async (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (selectedEvent?.id) {
        // Update existing event
        await updateCalendarEvent(selectedEvent.id, eventData);
        
        // Update events list
        setEvents(prevEvents => {
          return prevEvents.map(event => 
            event.id === selectedEvent.id 
              ? { ...event, ...eventData, id: selectedEvent.id } 
              : event
          );
        });
        
        showNotification('Event updated successfully', 'success');
      } else {
        // Create new event
        const newEvent = await createCalendarEvent({
          ...eventData,
          createdBy: user?.uid || 'anonymous'
        });
        
        // Add to events list if it belongs to the current month
        if (
          newEvent.startDate instanceof Date && 
          newEvent.startDate.getMonth() === currentMonth &&
          newEvent.startDate.getFullYear() === currentYear
        ) {
          setEvents(prevEvents => [...prevEvents, newEvent]);
        }
        
        showNotification('Event created successfully', 'success');
      }
      
      setShowEventForm(false);
      setSelectedEvent(undefined);
    } catch (error) {
      console.error('Error saving event:', error);
      showNotification('Failed to save event', 'error');
    }
  };

  // Generate calendar days
  const calendarDays = [];
  // Previous month days
  for (let i = 0; i < startingDayOfWeek; i++) {
    const day = new Date(currentYear, currentMonth, 0 - (startingDayOfWeek - i - 1));
    calendarDays.push({ date: day, isPreviousMonth: true });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(currentYear, currentMonth, i);
    calendarDays.push({ date: day, isCurrentMonth: true });
  }
  // Next month days
  const remainingDays = 42 - calendarDays.length; // 6 rows of 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(currentYear, currentMonth + 1, i);
    calendarDays.push({ date: day, isNextMonth: true });
  }

  // Filter events for the selected date
  const selectedDateEvents = selectedDate
    ? events.filter(event => {
        if (event.startDate instanceof Date) {
          return (
            event.startDate.getDate() === selectedDate.getDate() &&
            event.startDate.getMonth() === selectedDate.getMonth() &&
            event.startDate.getFullYear() === selectedDate.getFullYear()
          );
        }
        return false;
      })
    : [];

  // Check if a date has events
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      if (event.startDate instanceof Date) {
        return (
          event.startDate.getDate() === date.getDate() &&
          event.startDate.getMonth() === date.getMonth() &&
          event.startDate.getFullYear() === date.getFullYear()
        );
      }
      return false;
    });
  };

  // Format time helper
  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            <p className="text-gray-600">Manage your schedule and events</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              Today
            </button>
            <button 
              onClick={goToPreviousMonth}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiChevronLeft />
            </button>
            <button 
              onClick={goToNextMonth}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiChevronRight />
            </button>
            <div className="px-4 py-2 font-medium">
              {MONTHS[currentMonth]} {currentYear}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 flex justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-b">
              {DAYS.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDay(day.date);
                const isToday = day.date.toDateString() === new Date().toDateString();
                const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();

                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      min-h-24 p-1 border-t border-r
                      ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'} 
                      ${isToday ? 'border-blue-500 border-t-2' : ''}
                      ${isSelected ? 'bg-blue-50' : ''}
                      cursor-pointer hover:bg-gray-50
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-sm ${isToday ? 'font-bold text-blue-500' : ''}`}>
                        {day.date.getDate()}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div 
                          key={event.id} 
                          className={`text-xs p-1 rounded truncate text-white ${event.color}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEvent(event);
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                Events for {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <button 
                onClick={handleAddEvent}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
              >
                <FiPlus size={16} />
                <span>Add Event</span>
              </button>
            </div>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className={`w-4 h-4 rounded-full ${event.color} mr-3`}></div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      {event.startDate instanceof Date && (
                        <p className="text-sm text-gray-500">
                          {event.allDay 
                            ? 'All day' 
                            : formatEventTime(event.startDate) + 
                              (event.endDate instanceof Date ? ` - ${formatEventTime(event.endDate)}` : '')
                          }
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className="p-1 text-gray-500 hover:text-indigo-600"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => event.id && handleDeleteEvent(event.id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <FiCalendar className="mx-auto mb-2" size={24} />
                <p>No events scheduled for this day</p>
              </div>
            )}
          </div>
        )}

        {/* Event Form Modal */}
        <EventForm 
          event={selectedEvent}
          isOpen={showEventForm}
          onSave={handleSaveEvent}
          onCancel={() => {
            setShowEventForm(false);
            setSelectedEvent(undefined);
          }}
        />
      </div>
    </div>
  );
} 