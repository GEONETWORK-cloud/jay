"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, XIcon } from "lucide-react";
import { 
  Category as BaseCategory, 
  addCategory, 
  updateCategory, 
  loadCategories, 
  checkSlugExists 
} from "@/lib/categoriesService";

interface Category extends BaseCategory {
  color?: string;
  icon?: string;
  parent?: string;
}

// Local toast implementation
const toast = {
  success: (message: string) => console.log("Success:", message),
  error: (message: string) => console.error("Error:", message),
};

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  slug: z.string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug must contain only lowercase letters, numbers, and hyphens" 
    }),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  parent: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
}

export default function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugChecked, setSlugChecked] = useState(false);

  // Initialize the form with category data or defaults
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      color: category?.color || "",
      icon: category?.icon || "",
      parent: category?.parent || ""
    },
  });

  // Watch slug field for changes to check availability
  const slugValue = form.watch("slug");
  const nameValue = form.watch("name");

  // Load parent categories (excluding the current category if editing)
  useEffect(() => {
    async function fetchParentCategories() {
      try {
        const categories = await loadCategories();
        // Filter out the current category and any categories that have this category as parent
        // to prevent circular references
        const filteredCategories = categories.filter((cat: Category) => 
          cat.id !== category?.id && cat.parent !== category?.id
        );
        setParentCategories(filteredCategories);
      } catch (error) {
        console.error("Error loading parent categories:", error);
        toast.error("Failed to load parent categories");
      }
    }
    
    fetchParentCategories();
  }, [category]);

  // Auto-generate slug from name if name changes and slug hasn't been manually edited
  useEffect(() => {
    if (nameValue && !slugChecked) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      form.setValue("slug", generatedSlug);
    }
  }, [nameValue, form, slugChecked]);

  // Check slug availability with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (slugValue && slugValue.length > 1) {
      setCheckingSlug(true);
      setSlugAvailable(null);
      
      timeoutId = setTimeout(async () => {
        try {
          const exists = await checkSlugExists(slugValue, category?.id);
          setSlugAvailable(!exists);
        } catch (error) {
          console.error("Error checking slug:", error);
        } finally {
          setCheckingSlug(false);
        }
      }, 500);
    } else {
      setSlugAvailable(null);
    }
    
    return () => clearTimeout(timeoutId);
  }, [slugValue, category?.id]);

  // Set slugChecked to true when user manually edits the slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugChecked(true);
    form.setValue("slug", e.target.value);
  };

  async function onSubmit(data: FormValues) {
    if (checkingSlug) {
      toast.error("Please wait for slug availability check to complete");
      return;
    }
    
    if (slugAvailable === false) {
      toast.error("Slug is already taken. Please choose another");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (category?.id) {
        // Update existing category
        await updateCategory(
          category.id,
          {
            ...data
          }
        );
        toast.success("Category updated successfully");
      } else {
        // Create new category
        await addCategory(data);
        toast.success("Category created successfully");
      }
      
      if (onSuccess) {
        onSuccess();
      }
      
      form.reset();
    } catch (error) {
      console.error("Error saving category:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save category");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug*</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="category-slug" 
                    {...field} 
                    onChange={handleSlugChange}
                  />
                  {checkingSlug && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  {!checkingSlug && slugAvailable === true && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                  {!checkingSlug && slugAvailable === false && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <XIcon className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description of the category" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input 
                      type="color" 
                      className="w-12 h-10 p-1 mr-2" 
                      {...field} 
                    />
                    <Input 
                      type="text" 
                      placeholder="#FFFFFF" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input placeholder="Icon code or name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent category (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">None (Top-level category)</SelectItem>
                  {parentCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end pt-4 space-x-2">
          <Button type="button" variant="outline" onClick={() => onSuccess && onSuccess()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {category ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 