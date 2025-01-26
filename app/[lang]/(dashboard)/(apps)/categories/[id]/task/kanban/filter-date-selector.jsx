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
import { DatePicker, VisuallyHidden } from '@nextui-org/react';
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
import TaskRangePicker from 'components/TaskRangePicker';
import TaskTimePicker from 'components/TaskTimePicker';

const FilterDateSelector = ({
  dateSelector,
  setEnd,
  setStart,
  open,
  setOpen,
}) => {
  const location = usePathname();

  const [endDate, setEndDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [endTime, setEndTime] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [startDate, setStartDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [startTime, setStartTime] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );

  const onSubmit = () => {
    const startDateTime = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day,
      startTime.hour,
      startTime.minute,
    );
    const endDateTime = new Date(
      endDate.year,
      endDate.month - 1,
      endDate.day,
      endTime.hour,
      endTime.minute,
    );
    setStart(startDateTime);
    setEnd(endDateTime);
    setStartDate(parseAbsoluteToLocal(new Date().toISOString()));
    setStartTime(parseAbsoluteToLocal(new Date().toISOString()));
    setEndDate(parseAbsoluteToLocal(new Date().toISOString()));
    setEndTime(parseAbsoluteToLocal(new Date().toISOString()));
    onCloseDialog();
  };
  const onCloseDialog = () => {
    setStartDate(parseAbsoluteToLocal(new Date().toISOString()));
    setStartTime(parseAbsoluteToLocal(new Date().toISOString()));
    setEndDate(parseAbsoluteToLocal(new Date().toISOString()));
    setEndTime(parseAbsoluteToLocal(new Date().toISOString()));
    setOpen(false);
  };
  const onDateChange = (d, value) => {
    switch (value) {
      case 'startTime':
        setStartTime(d);
        break;
      case 'endTime':
        setEndTime(d);
        break;
      case 'date':
        setStartDate(d.start);
        setEndDate(d.end);
        break;
    }
  };
  const onEditStartTime = (t) => {
    onDateChange(t, 'startTime');
  };
  const onEditEndTime = (t) => {
    onDateChange(t, 'endTime');
  };
  const onEditDate = (t) => {
    onDateChange(t, 'date');
  };
  return (
    <Dialog open={open} onOpenChange={onCloseDialog}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className="flex-row justify-between items-center py-0 ">
          <DialogTitle className="text-default-900">
            Choose Date Filter Range
          </DialogTitle>
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
        <VisuallyHidden>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>
        <div className="py-0 pl-1 -mt-2">
          <div>
            <div className="w-full max-w-xl flex flex-row gap-4">
              <TaskRangePicker
                startDate={startDate}
                endDate={endDate}
                onEditDate={onEditDate}
              />
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <TaskTimePicker
                Time={startTime}
                onEditTime={onEditStartTime}
                label={'Starting :'}
              />
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <TaskTimePicker
                Time={endTime}
                onEditTime={onEditEndTime}
                label={'Ends:'}
              />
            </div>
          </div>
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

export default FilterDateSelector;
