import React, { startTransition, useEffect } from 'react';

import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from 'lib/utils';
import { useForm } from 'react-hook-form';
import { createCategory, updateCategory } from 'config/category-config';
import { usePathname } from 'next/navigation';
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

const schema = z.object({
  title: z.string().min(2, { message: 'Your title is invalid.' }),
  color: z.string().optional(),
});
const CreateCategory = ({ open, onClose, category, categoryId, userId }) => {
  const location = usePathname();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) => {
    const updatedData = {
      ...category,
      title: data.title,
      color: data.color,
    };
    if (category) {
      startTransition(async () => {
        await updateCategory(categoryId, updatedData, userId, location);
        toast.success('Successfully update');
      });
    } else {
      startTransition(async () => {
        await createCategory(data, userId, location);
        toast.success('Successfully added');
      });
    }

    onClose();
    reset();
  };
  useEffect(() => {
    setValue('title', category?.title || '');
    setValue('color', category?.color || '#6338f0');
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className="flex-row justify-between items-center py-0 ">
          <DialogTitle className="text-default-900">
            Create Category
          </DialogTitle>
          <DialogClose asChild>
            <div
              type="button"
              size="icon"
              className="w-7 h-7 bg-transparent hover:bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5 text-default-900" />
            </div>
          </DialogClose>
        </DialogHeader>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
        <div className="py-0 pl-1 -mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
            <div>
              <Label htmlFor="title" className="text-default-600 mb-1.5">
                Category Name
              </Label>
              <Input
                type="text"
                {...register('title')}
                name="title"
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.title,
                })}
              />
            </div>
            <div>
              <Label htmlFor="color" className="text-default-600 mb-1.5">
                Choose Color
              </Label>
              <Input
                type="color"
                {...register('color')}
                name="color"
                className="p-0 border-none rounded-md"
                defaultValue="#6338f0"
              />
            </div>
            <div className="flex justify-center gap-4">
              <DialogClose asChild>
                <Button
                  color="destructive"
                  variant="soft"
                  className="min-w-[136px]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button className="min-w-[136px]">Create Category</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
