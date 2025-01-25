'use client';
import React, { useState, useEffect, useTransition } from 'react';
import { toast } from 'react-hot-toast';
import { ScrollArea } from 'components/ui/scroll-area';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { cn, formatDate } from 'lib/utils';
import { createCategory, updateCategory } from 'config/category-config';
import { Button } from 'components/ui/button';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'components/ui/sheet';
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Textarea } from 'components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Calendar } from 'components/ui/calendar';

const schema = z.object({
  title: z.string().min(2, { message: 'Your email is invalid.' }),
  description: z.string().optional(),
  subtitle: z.string().optional(),
});

const CategoriesSheet = ({ open, category, onClose, selectedId }) => {
  // form state
  const [priority, setPriority] = React.useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const ResetForm = () => {
    reset();
  };

  const onSubmit = (data) => {
    data.priority = priority;
    data.assign = assign;
    data.assignDate = formatDate(startDate);
    data.dueDate = formatDate(endDate);
    const updatedCategory = {
      ...category,
      title: data.title,
      assign: data.assign,
      assignDate: data.assignDate,
      dueDate: data.dueDate,
      description: data.description,
    };

    if (category) {
      startTransition(async () => {
        try {
          await updateCategory(selectedId, updatedCategory);
          toast.success('Successfully Update');
        } catch (error) {
          toast.error('Something Went Wrong');
          console.log(error);
        }
      });
    } else {
      startTransition(async () => {
        try {
          await createCategory(data);
          toast.success('Successfully Added');
        } catch (error) {
          toast.error('Something Went Wrong');
          console.log(error);
        }
      });
    }

    onClose();
    reset();
  };

  useEffect(() => {
    setValue('title', category?.title || '');
    setValue('description', category?.description || '');
    setValue('assign', category?.assign || []);
    setValue('priority', category?.priority || '');
    const parsedAssignDate = category?.assignDate
      ? new Date(category.assignDate)
      : null;
    const parsedDueDate = category?.dueDate ? new Date(category.dueDate) : null;
    // Set state for startDate and endDate
    setStartDate(parsedAssignDate);
    setEndDate(parsedDueDate);
  }, [open]);

  return (
    <>
      <Sheet open={open}>
        <SheetContent
          onClose={() => {
            ResetForm();
            onClose();
          }}
          className="px-6"
        >
          <SheetHeader className="px-0">
            <SheetTitle>
              {category ? 'Edit ' : 'Create a new'} Category
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100%-40px)]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4  mt-6">
                <div className="flex items-center gap-4">
                  <div className="text-xs font-medium text-default-600">
                    Thumbnail
                  </div>

                  <Controller
                    name="file"
                    control={control}
                    render={() => (
                      <>
                        <Label
                          htmlFor="categoryLogo"
                          className="h-12 w-12 flex justify-center items-center bg-default-100 rounded"
                        >
                          <Plus className="w-6 h-6 text-default-400" />
                        </Label>
                        <Input
                          type="file"
                          id="categoryLogo"
                          className="hidden"
                        />
                      </>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="categoryName" className="mb-1.5">
                    Category Name
                  </Label>
                  <Input
                    type="text"
                    {...register('title')}
                    placeholder="Category Name"
                    className={cn('', {
                      'border-destructive focus:border-destructive':
                        errors.title,
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="mb-1.5">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Category Description"
                    {...register('description')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status" className="mb-1.5">
                      Status
                    </Label>
                    <Controller
                      name="status"
                      control={control}
                      render={() => (
                        <UiSelect>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To do</SelectItem>
                            <SelectItem value="inprogress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </UiSelect>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority" className="mb-1.5">
                      Priority
                    </Label>
                    <Controller
                      name="priority"
                      control={control}
                      render={() => (
                        <UiSelect
                          defaultValue={priority}
                          onValueChange={(data) => setPriority(data)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </UiSelect>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="assign" className="mb-1.5">
                    Assign
                  </Label>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="mb-1.5">
                      Start Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-between text-left font-normal border-default-300 bg-background ',
                            !startDate && 'text-muted-foreground',
                          )}
                        >
                          {startDate ? (
                            formatDate(startDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 " />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Controller
                          name="startDate"
                          control={control}
                          render={() => (
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="mb-1.5">
                      End Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-between text-left font-normal border-default-300 bg-background',
                            !endDate && 'text-muted-foreground',
                          )}
                        >
                          {endDate ? (
                            formatDate(endDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className=" h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Controller
                          name="endDate"
                          control={control}
                          render={() => (
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-6">
                <Button
                  color="warning"
                  variant="soft"
                  className="flex-1"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isPending} className="flex-1">
                  {category ? 'Update' : '  Create  '} Category
                </Button>
              </div>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CategoriesSheet;
