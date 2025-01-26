'use client';
import { Icon } from '@iconify/react';
import { CardContent, CardHeader, CardTitle } from 'components/ui/card';
import React, { useState, useEffect, startTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { isColorDark } from 'components/common/common';
import { usePathname } from 'next/navigation';
import { createCategoryBoard, deleteCategory } from 'config/category-config';
import { toast } from 'react-hot-toast';
import CreateCategory from '../../home/create-category';
import DeleteConfirmationDialog from '../../../../../../components/delete-confirmation-dialog';
const CategoryHeader = ({ category, boards }) => {
  const data = [
    {
      text: 'task number',
      date: '24',
    },
    {
      text: 'overdue tasks',
      date: '09',
    },
    {
      text: 'Completed tasks',
      date: '09',
    },
    {
      text: 'Upcoming deadlines',
      date: '02',
    },
  ];
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(isColorDark(category.color));
  }, [category.color]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const onEdit = () => {
    console.log(category);
  };
  function onAction(id) {
    startTransition(async () => {
      try {
        await deleteCategory(id, location);
      } catch (error) {
        console.log(error);
      }
    });
  }
  const location = usePathname();
  const CreateDefault = () => {
    const newTasks = {
      name: 'Just Added',
      color: '#38f078',
      categoryId: category.id,
      userId: category.userId,
      function: 'JustAdded',
    };
    const InProgress = {
      name: 'In Progress',
      color: '#38f0d1',
      categoryId: category.id,
      userId: category.userId,
      function: 'InProgress',
    };
    const Completed = {
      name: 'Completed',
      color: '#44f038',
      categoryId: category.id,
      userId: category.userId,
      function: 'Completed',
    };
    const Overdue = {
      name: 'Overdue',
      color: '#f03838',
      categoryId: category.id,
      userId: category.userId,
      function: 'Overdue',
    };

    startTransition(async () => {
      try {
        await createCategoryBoard(newTasks, category.id, null);
        await createCategoryBoard(InProgress, category.id, null);
        await createCategoryBoard(Completed, category.id, null);
        await createCategoryBoard(Overdue, category.id, location);
        toast.success('Successfully added Default Boards');
      } catch (error) {
        toast.error('Something Went Wrong');
      }
    });
  };
  return (
    <>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this category?"
        paragraph="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(category?.id)}
      />
      <CardHeader
        style={{
          backgroundColor: category ? category.color : '#FFFFFF',
          color: isDark ? 'white' : 'black',
        }}
        className=" border-0 rounded-t-md mb-0 flex-row items-center"
      >
        <CardTitle className="flex-1 mx-5">{category?.title}</CardTitle>
        {/* ellipsis */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="grid place-items-center rounded-md hover:bg-primary-500 text-white hover:text-white inset-hover-low"
            asChild
          >
            <Icon icon="line-md:align-justify" className="w-10 h-10 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[196px]" align="end">
            <DropdownMenuItem
              onSelect={() => {
                setSelectedCategory(category);
                setOpenEdit(true);
              }}
            >
              <Icon icon="line-md:edit-twotone" className="w-3.5 h-3.5 mr-1 " />
              Edit
            </DropdownMenuItem>
            {boards.length < 1 && (
              <DropdownMenuItem onSelect={CreateDefault}>
                <Icon icon="line-md:calendar" className="w-3.5 h-3.5 mr-1" />
                Add Default Boards
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={() => setOpen(true)}>
              <Icon icon="line-md:close-circle" className="w-3.5 h-3.5 mr-1" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="bg-white pb-3 inset-no-hover-low">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="text-sm text-default-600 w-full  mt-1"></div>
            <div className="mt-3 flex flex-wrap items-center gap-2 lg:gap-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]"
                >
                  <div className="text-sm font-medium text-default-500 capitalize">
                    {item.text}
                  </div>
                  <div className="text-sm font-medium text-default-900">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CreateCategory
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        category={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
};

export default CategoryHeader;
