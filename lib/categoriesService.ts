import { db } from './firebase';
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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryInput {
  name: string;
  slug: string;
  description?: string;
}

const COLLECTION_NAME = "categories";

// Load all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const categoriesQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy("name", "asc")
    );
    
    const snapshot = await getDocs(categoriesQuery);
    
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Category;
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}

// Load categories by parent
export async function loadCategoriesByParent(parentId: string | null) {
  try {
    const categoriesRef = collection(db, 'categories');
    
    let q;
    if (parentId) {
      // Get subcategories
      q = query(
        categoriesRef,
        where('parent', '==', parentId),
        orderBy('name', 'asc')
      );
    } else {
      // Get root categories (no parent)
      q = query(
        categoriesRef,
        where('parent', '==', null),
        orderBy('name', 'asc')
      );
    }
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      
      // Convert Firestore timestamps to JavaScript Date objects
      const createdAt = data.createdAt instanceof Timestamp 
        ? data.createdAt.toDate() 
        : data.createdAt;
        
      const updatedAt = data.updatedAt instanceof Timestamp 
        ? data.updatedAt.toDate() 
        : data.updatedAt;
      
      return {
        id: doc.id,
        ...data,
        createdAt,
        updatedAt
      } as Category;
    });
  } catch (error) {
    console.error('Error loading categories by parent:', error);
    showNotification('Failed to load categories', 'error');
    throw error;
  }
}

// Get single category
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Category;
  } catch (error) {
    console.error("Error getting category by ID:", error);
    throw error;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categoriesQuery = query(
      collection(db, COLLECTION_NAME),
      where("slug", "==", slug)
    );
    
    const snapshot = await getDocs(categoriesQuery);
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Category;
  } catch (error) {
    console.error("Error getting category by slug:", error);
    throw error;
  }
}

// Create a new category
export async function createCategory(categoryData: CategoryInput): Promise<string> {
  try {
    // Check if slug is already in use
    const existingCategory = await getCategoryBySlug(categoryData.slug);
    if (existingCategory) {
      throw new Error("Category with this slug already exists");
    }
    
    const now = serverTimestamp();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...categoryData,
      createdAt: now,
      updatedAt: now,
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

// Update a category
export async function updateCategory(id: string, categoryData: Partial<CategoryInput>): Promise<void> {
  try {
    // If slug is being updated, check if it's already in use by another category
    if (categoryData.slug) {
      const existingCategory = await getCategoryBySlug(categoryData.slug);
      if (existingCategory && existingCategory.id !== id) {
        throw new Error("Category with this slug already exists");
      }
    }
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...categoryData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

// Delete a category
export async function deleteCategory(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

// Helper function to create a slug from a name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')    // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

export async function addCategory(categoryData: CategoryInput): Promise<string> {
  return createCategory(categoryData);
}

export async function loadCategories(): Promise<Category[]> {
  return getCategories();
}

export async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const existingCategory = await getCategoryBySlug(slug);
  return existingCategory !== null && existingCategory.id !== excludeId;
} 