'use client';
import React, { useState, useEffect, startTransition } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader } from 'components/ui/card';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from 'components/ui/scroll-area';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import { Icon } from '@iconify/react';

import { deleteBoard, updateBoard } from 'config/category-config';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';
import { isColorDark } from 'components/common/common';
// dnd
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePathname } from 'next/navigation';
import { defaultFunctions } from 'components/common/common';
import { toast } from 'react-hot-toast';

const KanbanBoard = ({
  board,
  children,
  onEdit,
  taskHandler,
  isTaskOpen,
  showButton,
}) => {
  const [open, setOpen] = React.useState(false);
  const location = usePathname();
  function onAction(id) {
    startTransition(async () => {
      try {
        await deleteBoard(id, location);
      } catch (error) {
        console.log(error);
      }
    });
  }

  const { name, status, id } = board;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'Column',
      board,
    },
    disabled: isTaskOpen,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(isColorDark(board.color));
    console.log(isColorDark(board.color));
  }, [board.color]);
  const [statusIcon, setStatusIcon] = useState('line-md:clipboard');
  useEffect(() => {
    console.log('board name:', board?.name, 'board function:', board?.function);
    if (board?.function === 'JustAdded') {
      setStatusIcon('line-md:clipboard-arrow');
    }
    if (board?.function === 'InProgress') {
      setStatusIcon('line-md:clipboard-list');
    }
    if (board?.function === 'Completed') {
      setStatusIcon('line-md:clipboard-check');
    }
    if (board?.function === 'Overdue') {
      setStatusIcon('line-md:clipboard-remove');
    }
    if (!board?.function || board?.function === '') {
      setStatusIcon('line-md:clipboard');
    }
  }, [board.function]);
  const handleChangeFunction = (b, value) => {
    const updatedData = {
      ...b,
      function: value,
    };
    startTransition(async () => {
      try {
        const response = await updateBoard(b.id, updatedData, location);
        toast.success('Successfully updated ', response.name);
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      }
    });
  };
  return (
    <>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this board?"
        paragraph="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(board.id)}
      />
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(
          'max-w-[350px]  rounded-md !cursor-default flex-none w-full  shadow-lg bg-default-100 dark:bg-default-50 ',
          {
            'border-primary': status === 'primary',
            'border-warning': status === 'warning',
            'border-success': status === 'success',
            'opacity-50': isDragging,
          },
        )}
      >
        <CardHeader
          {...listeners}
          style={{
            borderColor: isDark ? 'white' : 'black',
            backgroundColor: board.color ? board.color : '#FFFFFF',
          }}
          className="flex-row items-center mb-0 justify-between border-0  rounded-t-md py-3 space-y-0 px-3"
        >
          <div
            style={{ color: isDark ? 'white' : 'black' }}
            className="flex flex-row text-sm font-semibold capitalize"
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="!rounded-md hover:bg-primary-500 mx-2 inset-hover-low bg-inherit"
              >
                <Icon icon={statusIcon} className="w-8 h-8 p-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[50px]" align="start">
                {defaultFunctions?.map(
                  (fn) =>
                    board.function !== fn.value && (
                      <DropdownMenuItem
                        onSelect={() => handleChangeFunction(board, fn.value)}
                        className="text-[10px] leading-[14px] font-semibold  text-default-600 py-1"
                        key={`key-dropdown-${fn.value}`}
                      >
                        Set As {fn.label}
                      </DropdownMenuItem>
                    ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="grid place-items-center">{name}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              style={{ color: isDark ? 'white' : 'black' }}
              className="!rounded-md hover:bg-primary-500 mx-2 inset-hover-low bg-inherit"
              asChild
            >
              <Icon
                icon="line-md:close-to-menu-transition"
                className="w-8 h-8 p-1"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="end">
              <DropdownMenuItem onSelect={() => onEdit(board)}>
                <Icon
                  icon="line-md:edit-twotone"
                  className="w-3.5 h-3.5 mr-1 "
                />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setOpen(true)}>
                <Icon
                  icon="line-md:close-circle"
                  className="w-3.5 h-3.5 mr-1"
                />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        {/* main content  */}
        <CardContent className="px-0 inset-no-hover-low pb-0">
          {/* all tasks */}
          <div className="h-[calc(100vh-300px)]">
            <ScrollArea className="h-full no-scrollbar">
              <div className="space-y-3 p-3">{children}</div>
            </ScrollArea>
          </div>
        </CardContent>
        <TooltipProvider delayDuration={1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardFooter className="w-full rounded-b-md bg-primary-200 px-0 pb-0 hover:bg-primary-500">
                {showButton && (
                  <Button
                    className="flex justify-center items-center gap-1 w-full h-full bg-transparent hover:bg-transparent text-primary hover:text-white"
                    onClick={() => taskHandler(id)}
                  >
                    <Icon icon="line-md:plus" className="w-6 h-6" />
                  </Button>
                )}
              </CardFooter>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add New Task To {board.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Card>
    </>
  );
};

export default KanbanBoard;
