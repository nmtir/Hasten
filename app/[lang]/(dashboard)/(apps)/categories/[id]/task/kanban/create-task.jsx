'use client';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from 'components/ui/sheet';
import { cn } from 'lib/utils';

import React, { useEffect, useState, startTransition } from 'react';

import NewTaskDatePicker from 'components/NewTaskDatePicker';
import Priority from './common/priority';
import AssignTags from './common/assign-tags';
import AssignList from './common/assign-list';
import { Textarea } from 'components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { createTask } from 'config/category-config';
import { VisuallyHidden } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
const taskSchema = z.object({
  title: z.string().min(2, { message: 'Your task Title is invalid.' }),
  description: z.string().optional(),
});
const CreateTask = ({
  categoryId,
  tags,
  user,
  priorities,
  board,
  boards,
  open,
  onClose,
}) => {
  const location = usePathname();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });
  const [selectedBoard, setSelectedBoard] = useState(board);
  const [selectedTags, setSelectedTags] = useState([]);
  const [priority, setPriority] = useState(null);
  const [startDate, setStartDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  useEffect(() => {
    setSelectedBoard(board);
  }, [board]);

  const [dueDate, setDueDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [startTime, setStartTime] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [dueTime, setDueTime] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );

  const onSubmit = (data) => {
    const end = new Date(
      dueDate.year,
      dueDate.month - 1,
      dueDate.day,
      dueTime.hour,
      dueTime.minute,
    );
    const start = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day,
      startTime.hour,
      startTime.minute,
    );
    const newTask = {
      categoryId: categoryId ? categoryId : null,
      boardId: selectedBoard ? selectedBoard.id : null,
      title: data.title,
      desc: data.description,
      start: start,
      end: end,
      priorityId: priority ? priority.id : null,
      tags: selectedTags,
      userId: user.id,
    };
    startTransition(async () => {
      try {
        await createTask(newTask, location);
        setPriority({});
        setSelectedTags([]);
        setDueDate(parseAbsoluteToLocal(new Date().toISOString()));
        setStartTime(parseAbsoluteToLocal(new Date().toISOString()));
        setStartDate(parseAbsoluteToLocal(new Date().toISOString()));
        setDueTime(parseAbsoluteToLocal(new Date().toISOString()));
        console.log(newTask);
        reset();
        onClose();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onDateChange = (d, value) => {
    switch (value) {
      case 'startTime':
        setStartTime(d);
        break;
      case 'dueTime':
        setDueTime(d);
        break;
      case 'date':
        setStartDate(d.start);
        setDueDate(d.end);
        break;
    }
  };
  const onTagsSelect = (t) => {
    setSelectedTags(t);
  };
  const onPrioritySelect = (p) => {
    setPriority(p);
  };
  const onBoardSelect = (b) => {
    setSelectedBoard(b);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="pt-5 overflow-y-auto no-scrollbar">
        <SheetHeader className="flex-row items-center justify-between mb-4">
          <VisuallyHidden>
            <SheetTitle></SheetTitle>
          </VisuallyHidden>
          <span className="text-lg font-semibold text-default-900">
            Create Task
          </span>
        </SheetHeader>
        <VisuallyHidden>
          <SheetDescription></SheetDescription>
        </VisuallyHidden>
        <div className="space-y-4">
          <form>
            <div>
              <Label className="mb-1.5 text-default-600">Title :</Label>
              <Input
                type="text"
                {...register('title')}
                name="title"
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.name,
                })}
                placeholder="Task..."
              />
            </div>
            <div>
              <Label htmlFor="board" className="mb-1.5 text-default-600">
                Description :
              </Label>
              <Textarea
                type="text"
                {...register('description')}
                name="description"
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.name,
                })}
                placeholder="Description..."
              />
            </div>
          </form>
          <div>
            <div>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm font-medium text-default-900">
                  Board :
                </span>
              </div>
              <AssignList
                categoryId={categoryId}
                onEdit={onBoardSelect}
                className="react-select"
                classNamePrefix="select"
                task={null}
                selectedBoard={board}
                boards={boards}
                isNew={true}
              />
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-default-900">
              Priority :
            </span>
            <Priority
              onEdit={onPrioritySelect}
              priorities={priorities}
              task={null}
              user={user}
              isNew={true}
            />
          </div>
          <div>
            <AssignTags
              onEdit={onTagsSelect}
              user={user}
              tags={tags}
              isNew={true}
            />
          </div>
          <div>
            <NewTaskDatePicker
              onEdit={onDateChange}
              startDate={startDate}
              dueDate={dueDate}
              startTime={startTime}
              dueTime={dueTime}
            />
          </div>
        </div>
        <div className="pb-10 mt-6">
          <SheetClose asChild>
            <Button type="button" color="warning">
              Cancel
            </Button>
          </SheetClose>
          <Button onClick={handleSubmit(onSubmit)}>Create Task</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;
