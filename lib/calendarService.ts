import { db, auth } from './firebase';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { showNotification } from './utils';

export interface CalendarEvent {
  id?: string;
  title: string;
  description?: string;
  startDate: Date | Timestamp;
  endDate?: Date | Timestamp;
  allDay: boolean;
  type: 'meeting' | 'task' | 'reminder' | 'other';
  color: string;
  createdBy: string;
  createdAt?: Date | Timestamp;
  updatedAt?: Date | Timestamp;
}

// Convert JavaScript Date to Firestore Timestamp
function dateToTimestamp(date: Date | Timestamp | undefined): Timestamp | undefined {
  if (!date) return undefined;
  if (date instanceof Timestamp) return date;
  return Timestamp.fromDate(date);
}

// Convert Firestore Timestamp to JavaScript Date
function timestampToDate(timestamp: Timestamp | Date | undefined): Date | undefined {
  if (!timestamp) return undefined;
  if (timestamp instanceof Date) return timestamp;
  return timestamp.toDate();
}

// Load all calendar events
export async function loadCalendarEvents() {
  try {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    const eventsRef = collection(db, 'calendarEvents');
    const q = query(
      eventsRef,
      where('createdBy', '==', auth.currentUser.uid),
      orderBy('startDate', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: timestampToDate(data.startDate),
        endDate: timestampToDate(data.endDate),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt)
      } as CalendarEvent;
    });
  } catch (error) {
    console.error('Error loading calendar events:', error);
    showNotification('Failed to load calendar events', 'error');
    throw error;
  }
}

// Load events by month
export async function loadEventsByMonth(year: number, month: number) {
  try {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    const eventsRef = collection(db, 'calendarEvents');
    
    // Calculate start and end of month
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);
    
    const q = query(
      eventsRef,
      where('createdBy', '==', auth.currentUser.uid),
      where('startDate', '>=', dateToTimestamp(startOfMonth)),
      where('startDate', '<=', dateToTimestamp(endOfMonth)),
      orderBy('startDate', 'asc')
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: timestampToDate(data.startDate),
        endDate: timestampToDate(data.endDate),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt)
      } as CalendarEvent;
    });
  } catch (error) {
    console.error('Error loading events by month:', error);
    showNotification('Failed to load calendar events', 'error');
    throw error;
  }
}

// Create a new calendar event
export async function createCalendarEvent(eventData: Omit<CalendarEvent, 'id'>) {
  try {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    const eventsRef = collection(db, 'calendarEvents');
    
    // Convert dates to Timestamps and ensure createdBy is set
    const eventWithTimestamps = {
      ...eventData,
      startDate: dateToTimestamp(eventData.startDate as Date),
      endDate: dateToTimestamp(eventData.endDate as Date),
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(eventsRef, eventWithTimestamps);
    
    // Return the event with proper date objects
    const newEvent = {
      id: docRef.id,
      ...eventData,
      createdBy: auth.currentUser.uid,
      startDate: eventData.startDate,
      endDate: eventData.endDate
    } as CalendarEvent;
    
    showNotification('Event created successfully', 'success');
    return newEvent;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    showNotification('Failed to create event', 'error');
    throw error;
  }
}

// Update an existing calendar event
export async function updateCalendarEvent(eventId: string, eventData: Partial<CalendarEvent>) {
  try {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    const eventRef = doc(db, 'calendarEvents', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (!eventDoc.exists()) {
      throw new Error('Event not found');
    }
    
    const eventDocData = eventDoc.data();
    if (eventDocData.createdBy !== auth.currentUser.uid) {
      throw new Error('Not authorized to update this event');
    }
    
    // Convert dates to Timestamps
    const updateData = {
      ...eventData,
      startDate: dateToTimestamp(eventData.startDate as Date),
      endDate: dateToTimestamp(eventData.endDate as Date),
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(eventRef, updateData);
    showNotification('Event updated successfully', 'success');
    return true;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    showNotification('Failed to update event', 'error');
    throw error;
  }
}

// Delete a calendar event
export async function deleteCalendarEvent(eventId: string) {
  try {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    const eventRef = doc(db, 'calendarEvents', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (!eventDoc.exists()) {
      throw new Error('Event not found');
    }
    
    const eventDocData = eventDoc.data();
    if (eventDocData.createdBy !== auth.currentUser.uid) {
      throw new Error('Not authorized to delete this event');
    }
    
    await deleteDoc(eventRef);
    showNotification('Event deleted successfully', 'success');
    return true;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    showNotification('Failed to delete event', 'error');
    throw error;
  }
} 