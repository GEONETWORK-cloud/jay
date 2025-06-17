import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiX } from 'react-icons/fi';
import { CalendarEvent } from '@/lib/calendarService';

type EventFormProps = {
  event?: Partial<CalendarEvent>;
  onSave: (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean; 
};

const EVENT_COLORS = [
  { label: 'Blue', value: 'bg-blue-500' },
  { label: 'Green', value: 'bg-green-500' },
  { label: 'Red', value: 'bg-red-500' },
  { label: 'Purple', value: 'bg-purple-500' },
  { label: 'Yellow', value: 'bg-yellow-500' },
  { label: 'Indigo', value: 'bg-indigo-500' },
];

const EVENT_TYPES = [
  { label: 'Meeting', value: 'meeting' },
  { label: 'Task', value: 'task' },
  { label: 'Reminder', value: 'reminder' },
  { label: 'Other', value: 'other' },
];

export default function EventForm({ event, onSave, onCancel, isOpen }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [type, setType] = useState<'meeting' | 'task' | 'reminder' | 'other'>('meeting');
  const [color, setColor] = useState('bg-blue-500');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');

      if (event.startDate) {
        const startDateObj = event.startDate instanceof Date ? event.startDate : new Date(event.startDate.toDate());
        setStartDate(formatDate(startDateObj));
        if (!allDay) {
          setStartTime(formatTime(startDateObj));
        }
      } else {
        const now = new Date();
        setStartDate(formatDate(now));
        setStartTime(formatTime(now));
      }

      if (event.endDate) {
        const endDateObj = event.endDate instanceof Date ? event.endDate : new Date(event.endDate.toDate());
        setEndDate(formatDate(endDateObj));
        if (!allDay) {
          setEndTime(formatTime(endDateObj));
        }
      }

      setAllDay(event.allDay || false);
      setType(event.type || 'meeting');
      setColor(event.color || 'bg-blue-500');
    } else {
      // Set default values for a new event
      const now = new Date();
      setStartDate(formatDate(now));
      setStartTime(formatTime(now));
      
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      setEndDate(formatDate(oneHourLater));
      setEndTime(formatTime(oneHourLater));
    }
  }, [event, allDay]);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (date: Date) => {
    return date.toTimeString().substring(0, 5);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!title.trim()) {
        setError('Event title is required');
        return;
      }

      if (!startDate) {
        setError('Start date is required');
        return;
      }

      // Validate start time
      const startDateTime = new Date(`${startDate}T${allDay ? '00:00' : startTime}`);
      const now = new Date();
      const minStartTime = new Date(now);
      minStartTime.setHours(1, 0, 0, 0); // Set to 1:00 AM

      if (startDateTime < minStartTime) {
        setError('Start time must be at least 1:00 AM');
        return;
      }

      // Validate end time
      let endDateTime;
      if (endDate) {
        endDateTime = new Date(`${endDate}T${allDay ? '23:59' : endTime || '23:59'}`);
        
        // Check if end time is before start time
        if (endDateTime < startDateTime) {
          setError('End time cannot be before start time');
          return;
        }

        // Check if end time is after 11:00 PM
        const maxEndTime = new Date(endDateTime);
        maxEndTime.setHours(23, 0, 0, 0); // Set to 11:00 PM
        if (endDateTime > maxEndTime) {
          setError('End time cannot be after 11:00 PM');
          return;
        }
      }

      setIsSubmitting(true);

      const eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'> = {
        title,
        description,
        startDate: startDateTime,
        endDate: endDateTime,
        allDay,
        type,
        color,
        createdBy: 'currentUser', // This should be the actual user ID
      };

      await onSave(eventData);
    } catch (err) {
      console.error('Error submitting event:', err);
      setError('Failed to save event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add validation for time inputs
  const validateTimeInput = (time: string, isStart: boolean) => {
    if (!time) return true;
    
    const [hours, minutes] = time.split(':').map(Number);
    
    if (isStart) {
      // Start time must be at least 1:00 AM
      return hours >= 1;
    } else {
      // End time must not be after 11:00 PM
      return hours <= 23;
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
    const time = e.target.value;
    if (validateTimeInput(time, isStart)) {
      if (isStart) {
        setStartTime(time);
      } else {
        setEndTime(time);
      }
    } else {
      setError(isStart ? 'Start time must be at least 1:00 AM' : 'End time cannot be after 11:00 PM');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center bg-indigo-600 text-white p-4">
          <h2 className="text-lg font-medium">
            {event?.id ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button 
            onClick={onCancel}
            className="text-white hover:text-gray-200"
            title="Close"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Event Title*
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="Enter event description"
            />
          </div>

          <div className="flex items-center">
            <input
              id="allDay"
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="allDay" className="ml-2 block text-sm text-gray-700">
              All-day event
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {!allDay && (
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time (min 1:00 AM)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="text-gray-400" />
                  </div>
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => handleTimeChange(e, true)}
                    min="01:00"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {!allDay && (
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  End Time (max 11:00 PM)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="text-gray-400" />
                  </div>
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => handleTimeChange(e, false)}
                    max="23:00"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                {EVENT_TYPES.map((eventType) => (
                  <option key={eventType.value} value={eventType.value}>
                    {eventType.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                {EVENT_COLORS.map((eventColor) => (
                  <option key={eventColor.value} value={eventColor.value}>
                    {eventColor.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 