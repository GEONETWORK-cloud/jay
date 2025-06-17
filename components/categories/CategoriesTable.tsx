"use client";

import { useState } from "react";
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  ChevronDown,
  ChevronRight,
  FolderIcon
} from "lucide-react";
import { Category as BaseCategory } from "@/lib/categoriesService";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface CategoriesTableProps {
  categories: BaseCategory[];
  onEdit: (category: BaseCategory) => void;
  onDelete: (categoryId: string) => void;
}

interface CategoryWithChildren extends BaseCategory {
  parent?: string;
  icon?: React.ReactNode;
  color?: string;
  children?: CategoryWithChildren[];
  level?: number;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Organize categories into a hierarchical structure
  const organizeCategories = (cats: BaseCategory[]): CategoryWithChildren[] => {
    const topLevel: CategoryWithChildren[] = [];
    const categoryMap: Record<string, CategoryWithChildren> = {};
    
    // First pass: add all categories to a map
    (cats as CategoryWithChildren[]).forEach(cat => {
      categoryMap[cat.id!] = { ...cat, children: [], level: 0 };
    });
    
    // Second pass: organize into hierarchical structure
    (cats as CategoryWithChildren[]).forEach(cat => {
      const categoryWithChildren = categoryMap[cat.id!];
      
      if (cat.parent && categoryMap[cat.parent]) {
        // This is a child category
        if (!categoryMap[cat.parent].children) {
          categoryMap[cat.parent].children = [];
        }
        categoryWithChildren.level = (categoryMap[cat.parent].level || 0) + 1;
        categoryMap[cat.parent].children!.push(categoryWithChildren);
      } else {
        // This is a top-level category
        topLevel.push(categoryWithChildren);
      }
    });
    
    return topLevel;
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const organizedCategories = organizeCategories(categories);

  // Recursive function to render categories with their children
  const renderCategoryRows = (categories: CategoryWithChildren[], parentExpanded = true) => {
    return categories.flatMap(category => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories[category.id!] || false;
      
      const indentation = category.level || 0;
      const showRow = parentExpanded;
      
      const rows: JSX.Element[] = [];
      
      if (showRow) {
        rows.push(
          <TableRow key={category.id}>
            <TableCell className="font-medium">
              <div 
                className="flex items-center" 
                style={{ paddingLeft: `${indentation * 1.5}rem` }}
              >
                {hasChildren ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 mr-1"
                    onClick={() => toggleExpand(category.id!)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <span className="w-7"></span>
                )}
                <span className="flex items-center">
                  {category.icon ? (
                    <span className="mr-2">{category.icon}</span>
                  ) : (
                    <FolderIcon className="h-4 w-4 mr-2" 
                      style={{ color: (category.color as string) || 'currentColor' }}
                    />
                  )}
                  {category.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{category.slug}</Badge>
            </TableCell>
            <TableCell>
              {category.color && (
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: (category.color as string) }}
                  ></div>
                  {category.color}
                </div>
              )}
            </TableCell>
            <TableCell className="max-w-xs truncate">
              {category.description}
            </TableCell>
            <TableCell>
              {category.createdAt && formatDate(category.createdAt)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(category)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(category.id!)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        );
      }
      
      // Render children if expanded
      if (hasChildren && isExpanded) {
        rows.push(...renderCategoryRows(category.children!, showRow));
      }
      
      return rows;
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No categories found. Create your first category.
              </TableCell>
            </TableRow>
          ) : (
            renderCategoryRows(organizedCategories)
          )}
        </TableBody>
      </Table>
    </div>
  );
} 