'use client';
import React from 'react';
import { Button } from 'components/ui/button';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardFooter, CardHeader } from 'components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from 'components/ui/input';
import { ChevronDown, List } from 'lucide-react';
import { createTask } from 'config/category-config';
import { useForm } from 'react-hook-form';
import { cn } from 'lib/utils';
import AssignList from './common/assign-list';

const schema = z.object({
  title: z.string().min(2, { message: 'title' }),
});
const AddTask = ({ onClose, boardId, boards }) => {
  const [startTransition] = React.useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    data.boardId = boardId;

    startTransition(() => {
      createTask(data)
        .then(() => toast.success('Successfully added'))
        .catch((error) => console.log(error));
    });

    onClose();
    reset();
  };
  return (
    <Card className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="mb-0">
          <div>
            <div className="text-base font-medium text-default-900 flex items-center gap-1 mb-[2px]">
              Board <ChevronDown className="w-4 h-4" />
            </div>
            <div className="text-xs font-medium text-default-600">
              {boards[0].label}
            </div>

            <div>
              <div className="flex items-center gap-1 mb-2">
                <div className="bg-default-100 h-6 w-6 rounded-full grid place-content-center">
                  <List className="text-primary w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-default-900">
                  Board
                </span>
              </div>
              <AssignList
                onEdit={null}
                task={null}
                selectedBoard={null}
                boards={boards}
                isNew={false}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 pb-0">
          <Input
            type="text"
            {...register('title')}
            className={cn('', {
              'border-destructive focus:border-destructive': errors.title,
            })}
          />
        </CardContent>
        <CardFooter className="mt-1 justify-end gap-3 pt-0 p-3">
          <Button
            type="button"
            color="destructive"
            variant="soft"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddTask;
