import React, { useTransition } from 'react';

import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from 'lib/utils';
import { useForm } from 'react-hook-form';

import { createUserPriority, updatePriority } from 'config/category-config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from 'components/ui/dialog';

import { X } from 'lucide-react';
import { useUser } from 'provider/userProvider';
import { Label } from 'components/ui/label';

const schema = z.object({
  name: z.string().min(2, { message: 'Your email is invalid.' }),
  color: z.string().optional(),
});
const CreatePriority = ({ open, onClose, priority, priorityId }) => {
  const { user } = useUser();
  const [startTransition] = useTransition();
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
      ...priority,
      name: data.name,
      color: data.color,
    };
    if (priority) {
      startTransition(async () => {
        try {
          await updatePriority(priorityId, updatedData);
          toast.success('Successfully update');
        } catch (error) {
          console.log(error);
          toast.error('Something Went Wrong');
        }
      });
    } else {
      startTransition(async () => {
        try {
          await createUserPriority(data, user.id);
          toast.success('Successfully added');
        } catch (error) {
          console.log(error);
          toast.error('Something Went Wrong');
        }
      });
    }

    console.log(data, 'ami priority data');
    onClose();
    reset();
  };
  React.useEffect(() => {
    setValue('name', priority?.name || '');
    setValue('color', priority?.color || '#6338f0');
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className="flex-row justify-between items-center py-0 ">
          <DialogTitle className="text-default-900">
            Create Priority
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
        <DialogDescription className="py-0 pl-1 -mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
            <div>
              <Label htmlFor="priorityName" className="text-default-600 mb-1.5">
                Priority Name
              </Label>
              <Input
                type="text"
                {...register('name')}
                id="priorityName"
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.name,
                })}
              />
            </div>
            <div>
              <Label
                htmlFor="priorityColor"
                className="text-default-600 mb-1.5"
              >
                Choose Color
              </Label>
              <Input
                type="color"
                {...register('color')}
                name="priorityColor"
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
              <Button className="min-w-[136px]">Create Priority</Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePriority;
