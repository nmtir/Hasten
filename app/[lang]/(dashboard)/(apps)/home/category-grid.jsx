'use client';
import React, { startTransition, useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardFooter } from 'components/ui/card';
import { deleteCategory } from 'config/category-config';
import { Button } from 'components/ui/button';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';

import { VisuallyHidden } from '@nextui-org/react';
import { isColorDark } from 'components/common/common';
import { usePathname } from 'next/navigation';

const CategoryGrid = ({
  category,
  setSelectedCategory,
  openCreateCategory,
}) => {
  const [open, setOpen] = React.useState(false);
  const location = usePathname();
  function onAction(id) {
    startTransition(async () => {
      try {
        await deleteCategory(id, location);
      } catch (error) {
        console.log(error);
      }
    });
  }

  const mode = 'light';
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(isColorDark(category.color));
    console.log(isColorDark(category.color));
  }, [category.color]);
  return (
    <>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this category?"
        paragraph="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(category?.id)}
      />
      <Card>
        <CardHeader
          style={{
            backgroundColor: category ? category.color : '#FFFFFF',
            color: isDark ? 'white' : 'black',
          }}
          className="flex-row bg-opacity-75 items-center !rounded-t-md gap-3 border-none mb-0"
        >
          <div className="flex-1">
            <Link
              href={{
                pathname: `categories/${category?.id}/task`,
              }}
            >
              <div className="flex gap-2">
                <div>
                  <div className="text-base font-semibold text-white capitalize mb-1">
                    {category?.title}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="flex-none h-6 w-6 bg-inherit text-white hover:text-white rounded-full hover:bg-primary-500"
              >
                <MoreHorizontal className="h-4 w-4 text-default-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={{
                    pathname: `categories/${category?.id}/task`,
                  }}
                  className="w-full"
                >
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setOpen(true)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedCategory(category);
                  openCreateCategory();
                }}
                className="cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <VisuallyHidden>
          <CardContent className="p-4 pt-0 pb-5" />
        </VisuallyHidden>
        <CardFooter className="flex justify-between border-t  p-4">
          <div>
            <div className="text-xs  text-default-600 mb-[2px]">
              Next Task Starts in:
            </div>
            <span className="text-xs font-medium text-default-900">
              {category?.assignDate}
            </span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default CategoryGrid;
