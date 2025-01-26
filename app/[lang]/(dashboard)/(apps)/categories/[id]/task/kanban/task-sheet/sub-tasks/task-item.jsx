'use client';
import React, { startTransition } from 'react';
import { Checkbox } from 'components/ui/checkbox';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from 'components/ui/avatar';
import { Button } from 'components/ui/button';
import { Icon } from '@iconify/react';
import { Badge } from 'components/ui/badge';
import { useState } from 'react';
import { ArrowRightLeft, Check, Tag, Trash2 } from 'lucide-react';

import AssignMembers from '../../common/assign-members';
import { cn } from 'lib/utils';
import { updateSubTask, deleteSubTask } from 'config/category-config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';
import { usePathname } from 'next/navigation';
const TaskItem = ({ fetch, subtask, handlerSubSheet }) => {
  const location = usePathname();
  const { completed, assignDate, id } = subtask;
  const [isDone, setIsDone] = React.useState(completed);
  // update isComplete
  const [open, setOpen] = useState(false);

  const handleIsComplete = (value) => {
    const newData = {
      ...subtask,
      completed: value,
    };
    startTransition(async () => {
      try {
        await updateSubTask(id, newData, location);
        setIsDone(!isDone);
        await fetch();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onAction = (dltId) => {
    startTransition(async () => {
      try {
        await deleteSubTask(dltId, location);
        await fetch();
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this subtask?"
        paragraph="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(id)}
      />
      <div
        className={cn(
          'flex gap-2 border-b border-dashed border-default-200 py-3 px-6 cursor-pointer',
          {
            'bg-default-50': completed,
          },
        )}
        onClick={() => handlerSubSheet(subtask)}
      >
        <div className="mt-1 flex-none">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              size="sm"
              checked={isDone}
              onCheckedChange={handleIsComplete}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex">
            <div
              className={cn('flex-1 text-base font-medium text-default-900', {
                'line-through': completed,
              })}
            >
              {subtask?.title}
            </div>
            <div className="flex-none flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    className="h-6 w-6 bg-default-100 text-primary rounded-full hover:bg-default-100 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      icon="heroicons:ellipsis-horizontal"
                      className="w-4 h-4 text-default-900"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit" align="end">
                  <DropdownMenuItem
                    className="gap-2 hover:bg-destructive hover:text-destructive-foreground group"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-default-500 group-hover:text-destructive-foreground" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            {completed ? (
              <Badge
                color="success"
                variant="soft"
                className="text-[10px] px-1 py-0 rounded leading-4 capitalize"
              >
                Completed
              </Badge>
            ) : (
              <Badge
                color="warning"
                variant="soft"
                className="text-[10px] px-1 py-0 rounded leading-4 capitalize"
              >
                {subtask.priority}
              </Badge>
            )}

            <div className="text-xs text-default-500 flex items-center gap-1">
              <Icon
                icon="heroicons:calendar"
                className="w-3.5 h-3.5 text-default-500"
              />
              <span>{assignDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
