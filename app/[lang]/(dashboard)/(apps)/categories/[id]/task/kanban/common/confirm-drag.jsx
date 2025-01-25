import React, { startTransition, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from 'lib/utils';
import { useForm } from 'react-hook-form';
import {
  createCategoryBoard,
  updateBoard,
  updateTask,
} from 'config/category-config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from 'components/ui/dialog';

import { X } from 'lucide-react';
import { Label } from 'components/ui/label';
import { VisuallyHidden } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

import { Icon } from '@iconify/react';

import { defaultFunctions } from 'components/common/common';
import NewTaskDatePicker from 'components/NewTaskDatePicker';
import { parseAbsoluteToLocal } from '@internationalized/date';

const ConfirmDrag = ({ targetBoard, prevBoard, task, open, setOpen }) => {
  const location = usePathname();
  const [startDate, setStartDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [dueDate, setDueDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [startTime, setStartTime] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [dueTime, setDueTime] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );

  const onSubmit = () => {
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

    const updatedData = {
      ...task,
      boardId: targetBoard.id,
      start: start,
      end: end,
    };
    startTransition(async () => {
      try {
        await updateTask(task.id, updatedData, location);
      } catch (error) {
        console.log(error);
      }
    });
    setDueDate(parseAbsoluteToLocal(new Date().toISOString()));
    setStartTime(parseAbsoluteToLocal(new Date().toISOString()));
    setStartDate(parseAbsoluteToLocal(new Date().toISOString()));
    setDueTime(parseAbsoluteToLocal(new Date().toISOString()));
    onCloseDialog();
  };
  const onCloseDialog = () => {
    setDueDate(parseAbsoluteToLocal(new Date().toISOString()));
    setStartTime(parseAbsoluteToLocal(new Date().toISOString()));
    setStartDate(parseAbsoluteToLocal(new Date().toISOString()));
    setDueTime(parseAbsoluteToLocal(new Date().toISOString()));
    setOpen(false);
  };
  const onDateChange = (d, value) => {
    switch (value) {
      case 'startTime':
        setStartTime(d);
        break;
      case 'dueTime':
        setDueTime(d);
        break;
      case 'Date':
        setStartDate(d.start);
        setDueDate(d.end);
        break;
    }
  };
  return (
    <Dialog open={open} onOpenChange={onCloseDialog}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className="flex-row justify-between items-center py-0 ">
          <DialogTitle className="text-default-900">Are You Sure?</DialogTitle>
          <DialogClose asChild>
            <div
              type="button"
              size="icon"
              className="w-7 h-7 bg-transparent hover:bg-transparent cursor-pointer"
            >
              <Icon icon="line-md:close" className="w-5 h-5 text-default-900" />
            </div>
          </DialogClose>
        </DialogHeader>
        <DialogDescription>
          This Task Is Marked As {prevBoard?.function}, If You Really Want To
          Restore It You Must Reschedule It.
        </DialogDescription>

        <div className="py-0 pl-1 -mt-2">
          <NewTaskDatePicker
            onEdit={onDateChange}
            startDate={startDate}
            dueDate={dueDate}
            startTime={startTime}
            dueTime={dueTime}
          />
        </div>
        <div className="flex justify-center gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              color="destructive"
              variant="soft"
              className="min-w-[136px]"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} className="min-w-[136px]">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDrag;
