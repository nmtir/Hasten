import React, { startTransition, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from 'lib/utils';
import { useForm } from 'react-hook-form';
import { createCategoryBoard, updateBoard } from 'config/category-config';
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

const boardSchema = z.object({
  name: z.string().min(2, { message: 'Your name is invalid.' }),
  color: z.string().optional(),
  function: z.string().optional(),
});
const CreateBoard = ({ categoryId, open, onClose, board, boardId }) => {
  const location = usePathname();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(boardSchema),
  });
  const onSubmit = (data) => {
    console.log('submit', data.function);
    if (board) {
      const updatedData = {
        ...board,
        name: data.name,
        color: data.color,
        function: selectedFn,
      };
      startTransition(async () => {
        try {
          const response = await updateBoard(boardId, updatedData, location);
          toast.success('Successfully updated ', response.name);
        } catch (error) {
          toast.error('Something Went Wrong');
          console.log(error);
        }
      });
    } else {
      const createData = {
        name: data.name,
        color: data.color,
        function: selectedFn,
      };
      startTransition(async () => {
        try {
          const response = await createCategoryBoard(
            createData,
            categoryId,
            location,
          );
          toast.success('Successfully added ', response.name);
        } catch (error) {
          console.log(error);
          toast.error('Something Went Wrong');
        }
      });
    }
    setSelectedFn(null);
    onClose();
    reset();
  };
  React.useEffect(() => {
    setValue('name', board?.name || '');
    setValue('color', board?.color || '#6338f0');
    setValue('function', board?.function || '');
    setSelectedFn(board?.function);
  }, [open]);
  const [selectedFn, setSelectedFn] = useState(null);
  const onCloseDialog = () => {
    setSelectedFn(null);
    onClose();
    reset();
  };
  return (
    <Dialog modal="false" open={open} onOpenChange={onCloseDialog}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className="flex-row justify-between items-center py-0 ">
          <DialogTitle className="text-default-900"></DialogTitle>
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
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
            <div>
              <Label htmlFor="boradName" className="text-default-600 mb-1.5">
                Board Name
              </Label>
              <Input
                type="text"
                {...register('name')}
                id="boardName"
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.name,
                })}
              />
            </div>
            <div>
              <Label htmlFor="function" className="text-default-600 mb-1.5">
                Role
              </Label>
              <Select
                id="function"
                value={selectedFn}
                onValueChange={(value) => {
                  setSelectedFn(value);
                }}
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.functon,
                })}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={'Set As...'}
                    icon={
                      <Icon icon="" className="line-md:chevron-small-down" />
                    }
                  />
                </SelectTrigger>
                <SelectContent className="z-[10000]">
                  {defaultFunctions.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bordColor" className="text-default-600 mb-1.5">
                Choose Color
              </Label>
              <Input
                type="color"
                {...register('color')}
                id="bordColor"
                className="p-0 border-none rounded-md"
                defaultValue="#6338f0"
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
              <Button type="submit" className="min-w-[136px]">
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
