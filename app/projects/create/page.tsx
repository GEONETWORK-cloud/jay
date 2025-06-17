"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { createProject } from "@/lib/firebaseService";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ArrowLeft, Plus, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  liveLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  projectLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  sourceCodeUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const COLORS = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#F033FF", // Purple
  "#FF33A8", // Pink
  "#33FFF5", // Cyan
  "#FFD133", // Yellow
  "#FF8333", // Orange
];

// Color names for better user experience
const COLOR_NAMES = {
  "#FF5733": "Red",
  "#33FF57": "Green",
  "#3357FF": "Blue",
  "#F033FF": "Purple",
  "#FF33A8": "Pink",
  "#33FFF5": "Cyan",
  "#FFD133": "Yellow",
  "#FF8333": "Orange"
};

const CATEGORIES = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Data Analytics",
  "Digital Marketing",
  "Music Production",
  "Shop Items"
];

type ColoredItem = {
  name: string;
  color: string;
};

export default function CreateProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<ColoredItem[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [tagColor, setTagColor] = useState(COLORS[0]);
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      liveLink: "",
      projectLink: "",
      sourceCodeUrl: "",
    },
  });

  const addTag = () => {
    if (newTagName.trim()) {
      // Ensure we're using the exact color selected
      setTags([...tags, { name: newTagName.trim(), color: tagColor }]);
      setNewTagName("");
      // Don't randomize the color after adding a tag to make it easier to add multiple tags of the same color
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: ProjectFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a project");
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const projectData = {
        title: values.title,
        description: values.description,
        category: values.category,
        tags: tags.map(tag => tag.name),
        tagColors: tags.reduce((acc, tag) => {
          acc[tag.name] = tag.color;
          return acc;
        }, {} as Record<string, string>),
        imageUrl: values.imageUrl || "",
        liveLink: values.liveLink || "",
        projectLink: values.projectLink || "",
        sourceCodeUrl: values.sourceCodeUrl || "",
        createdBy: user.uid,
      };

      await createProject(projectData);
      toast.success("Project created successfully");
      router.push('/projects');
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/projects')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Create New Project</h1>
          <p className="text-gray-600">Fill out the form below to create a new project</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide information about your new project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Project title" {...field} />
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
                          placeholder="Describe your project"
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {CATEGORIES.map((category) => (
                            <SelectItem 
                              key={category} 
                              value={category}
                              className="cursor-pointer"
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                      <div 
                        key={index}
                        className="flex items-center px-3 py-1 rounded-full text-white text-sm"
                        style={{ backgroundColor: tag.color }}
                      >
                        <span>{tag.name}</span>
                        <button 
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-2 focus:outline-none"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {tags.length === 0 && (
                      <div className="text-sm text-gray-500">No tags added yet</div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a tag (e.g. web, design, app)"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      className="flex-grow"
                    />
                    <div className="flex flex-col items-center space-y-2 mr-2">
                      <div 
                        className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-gray-500 flex items-center justify-center"
                        style={{ backgroundColor: tagColor }}
                      >
                        <span className="sr-only">Selected color: {COLOR_NAMES[tagColor as keyof typeof COLOR_NAMES]}</span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`w-6 h-6 rounded-full ${tagColor === color ? 'ring-2 ring-offset-1 ring-black' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setTagColor(color)}
                            aria-label={`Select color ${COLOR_NAMES[color as keyof typeof COLOR_NAMES]}`}
                          />
                        ))}
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      onClick={addTag}
                      disabled={!newTagName.trim()}
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="liveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Demo URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/demo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Link (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceCodeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Code URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/username/repo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/projects')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Project"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 