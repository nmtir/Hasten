'use client';
import React, { startTransition, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubItem,
  DropdownMenuSeparator,
} from 'components/ui/dropdown-menu';
import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import { Icon } from '@iconify/react';

import { Card, CardContent, CardFooter, CardHeader } from 'components/ui/card';
import { Calendar, ChevronDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Checkbox } from 'components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from 'components/ui/tooltip';
import { deleteTask, updateTask } from 'config/category-config';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';
import { cn } from 'lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { formatDateTime } from 'components/common/common';
import { useTaskStatus } from 'hooks/use-task-status';
import { usePathname } from 'next/navigation';
import { useCurrentTime } from './kanban';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';
import { defaultFunctions } from 'components/common/common';
import { toast } from 'react-hot-toast';
import { useDraggable } from '@dnd-kit/core';

const KanbanTask = ({ task, onUpdateTask, boards }) => {
  const [open, setOpen] = React.useState(false);
  const { id, title, desc, image, start, end } = task;
  const [value, setValue] = React.useState('one');
  const priority = null;
  const location = usePathname();
  const currentTime = useCurrentTime();
  const { statusIcon, statusText } = useTaskStatus({
    task: task,
    fetchPath: location,
    currentTime: currentTime,
    boards: boards,
  });
  const [board, setBoard] = useState(boards.find((b) => b.id === task.boardId));
  const handleMoveTask = (task) => {
    let newData;
    if (board.function === 'JustAdded') {
      const targetBoard = boards.find((b) => b.function === 'InProgress');
      newData = {
        ...task,
        boardId: targetBoard.id,
      };
    }
    if (board.function === 'InProgress') {
      const targetBoard = boards.find((b) => b.function === 'Completed');
      newData = {
        ...task,
        boardId: targetBoard.id,
      };
    }
    startTransition(async () => {
      try {
        await updateTask(task.id, newData, location);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const getBoardNameById = (boardId) => {
    const foundBoard = boards.find((board) => board.id === boardId);
    return foundBoard ? foundBoard.name : 'Unknown Board';
  };
  const boardName = getBoardNameById(task.boardId);

  const onAction = (dltId) => {
    startTransition(async () => {
      try {
        await deleteTask(dltId);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: false,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const moveTaskToBoard = (fn, b) => {
    const selectedBoard = b
      ? boards.find((board) => board.id === b.id)
      : boards.find((board) => board.function === fn);
    const newData = {
      ...task,
      boardId: selectedBoard.id,
    };
    startTransition(async () => {
      try {
        await updateTask(task.id, newData, location);
        toast.success('Task Moved To', selectedBoard.name);
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      }
    });
  };
  const handlePointerUp = (e) => {
    if (!isDragging) {
      if (value === task.id) setValue(0);
      else setValue(task.id);
    }
  };
  return (
    <>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this task?"
        paragraph="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(id)}
      />
      <Accordion
        type="single"
        collapsible
        className="shadow  border-default-200 bg-white rounded-md  w-full  space-y-3.5 p-3 !cursor-default group relative"
        value={value}
      >
        <AccordionItem
          value={task.id}
          className="shadow-none space-x-0 space-y-0 p-0 flex-row items-center justify-between p-0 border-none"
        >
          <AccordionTrigger
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={cn({
              'opacity-50': isDragging,
              'cursor-grabbing': isDragging,
            })}
            onPointerUp={handlePointerUp}
            value={task.id}
            arrow
          >
            <div className="flex flex-row justify-between !cursor-grab w-full text-start">
              <div className="flex flex-row">
                <div
                  className="flex items-center gap-1 "
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-6 h-6 text-black" asChild>
                      <Icon icon="line-md:align-justify" className="p-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuContent className="w-[196px]" align="start">
                        <DropdownMenuItem onSelect={() => setOpen(true)}>
                          <Icon
                            icon="line-md:edit-twotone"
                            className="w-4 h-4 mr-3"
                          />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Icon
                              icon="line-md:arrows-horizontal-alt"
                              className="w-4 h-4 mr-3"
                            />
                            Move To
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {boards
                                .filter((board) =>
                                  defaultFunctions.some(
                                    (fn) => fn.value === board.function,
                                  ),
                                )
                                .map((b) => {
                                  const corrFn = defaultFunctions.find(
                                    (fn) => fn.value === b.function,
                                  );
                                  if (task.boardId === b.id) return null;
                                  return (
                                    <DropdownMenuSubItem
                                      key={b.id}
                                      onClick={() => moveTaskToBoard(corrFn, b)}
                                    >
                                      <Icon
                                        icon={corrFn.icon}
                                        className="w-4 h-4 mr-3"
                                      />
                                      {b.name}
                                    </DropdownMenuSubItem>
                                  );
                                })}
                              <DropdownMenuSeparator />
                              {boards.map((b) => {
                                if (task.boardId === b.id) return null;
                                return !defaultFunctions.some(
                                  (fn) => fn.value === b.function,
                                ) ? (
                                  <DropdownMenuSubItem
                                    onClick={() =>
                                      moveTaskToBoard(b.function, b)
                                    }
                                    key={b.id}
                                  >
                                    <Icon
                                      icon="line-md:clipboard"
                                      className="w-4 h-4 mr-3"
                                    />
                                    {b.name}
                                  </DropdownMenuSubItem>
                                ) : null;
                              })}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem onSelect={() => setOpen(true)}>
                          <Icon
                            icon="line-md:close-circle"
                            className="w-4 h-4 mr-3"
                          />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuPortal>
                  </DropdownMenu>
                </div>
                <div className="grid place-content-center ml-2">
                  {task.title}
                </div>
              </div>
              <div
                className="ml-1 grid text-primary-500/50 !cursor-pointer place-items-center rounded-md hover:bg-primary-500  hover:text-white inset-hover-low cursor-default aria-selected:bg-primary-500 aria-selected:text-white inset-hover-low text-sm transition-colors px-1 focus:bg-primary-500 focus:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateTask(task, boardName);
                }}
              >
                <div>Details</div>
              </div>
              <TooltipProvider delayDuration={1000}>
                <Tooltip>
                  <TooltipTrigger
                    className="grid place-items-center !cursor-pointer justify-self-end "
                    asChild
                  >
                    <Icon
                      icon={
                        statusIcon
                          ? statusIcon
                          : 'line-md:coffee-half-empty-filled-loop'
                      }
                      className="w-5 h-5 text-default-500"
                    />
                  </TooltipTrigger>
                  <TooltipContent color="primary" side="bottom">
                    <p>{statusText}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {board.function === 'InProgress' ||
              board.function === 'JustAdded' ? (
                <TooltipProvider delayDuration={1000}>
                  <Tooltip>
                    <TooltipTrigger
                      className="grid place-items-center !cursor-pointer justify-self-end "
                      asChild
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveTask(task);
                      }}
                    >
                      <Icon
                        icon="line-md:arrow-open-right"
                        className="w-5 h-5 text-default-500"
                      />
                    </TooltipTrigger>
                    <TooltipContent color="primary" side="bottom">
                      <p>Move To Next Board</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <></>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="!cursor-default !transition-transform !duration-100 !ease-in-out">
            <p className="mb-2">{task.desc}</p>
            <div className="w-full flex flex-wrap items-center gap-x-3 gap-y-2">
              <div
                className="flex items-center gap-1 text-xs text-default-600"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon
                  icon="line-md:login"
                  className="w-3.5 h-3.5 text-default-500"
                />
                {formatDateTime(start)}
              </div>
              <div
                className="flex items-center gap-1 text-xs text-default-600"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon
                  icon="line-md:logout"
                  className="w-3.5 h-3.5 text-default-500"
                />
                {formatDateTime(end)}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default KanbanTask;
