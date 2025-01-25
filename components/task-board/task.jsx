"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "components/ui/card";
import {
  Calendar,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Checkbox } from "components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import { deleteTask, updateTask } from "config/category-config";
import DeleteConfirmationDialog from "components/delete-confirmation-dialog";
import { cn } from "lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task, onUpdateTask, boards }) => {
  const [open, setOpen] = React.useState(false);
  const {
    id,
    title,
    desc,
    image,
    start,
    end,
  } = task;

  const priority = null;


  const handleMoveTask = (task, boardId) => {
    const newData = {
      ...task,
      boardId: boardId,
    };
    updateTask(task.id, newData).catch(error => console.log(error));
  };

  const getBoardNameById = (boardId) => {
    const foundBoard = boards.find((board) => board.id === boardId);
    return foundBoard ? foundBoard.name : "Unknown Board";
  };
  const boardName = getBoardNameById(task.boardId);

  const onAction = (dltId) => {
    deleteTask(dltId).catch(error => console.log(error));
  };
  const {
    setNodeRef,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: false,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
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
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(
          "shadow  border-default-200  p-3 cursor-pointer group relative",
          {
            "opacity-50": isDragging,
          }
        )}
        onClick={() => onUpdateTask(task, boardName)}
      >
        <CardHeader className="space-x-0 space-y-0 p-0 flex-row items-center justify-between mb-0 border-none">
          <div className="flex items-center gap-1">
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="text-[10px] leading-[14px] font-semibold  text-default-600 border border-default-200 px-1.5  rounded-sm flex justify-center items-center gap-[2px]">
                    {getBoardNameById(task.boardId)}
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[50px]" align="start">
                  {boards?.map((board) => (
                    <DropdownMenuItem
                      onSelect={() => handleMoveTask(task, board.id)}
                      className="text-[10px] leading-[14px] font-semibold  text-default-600 py-1"
                      key={`key-dropdown-${board.id}`}
                    >
                      {board.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div
            className="flex items-center gap-1 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-transparent hover:bg-transparent "
                >
                  <MoreHorizontal className="w-4 h-4 text-default-900" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[196px]" align="start">
                <DropdownMenuItem onSelect={() => setOpen(true)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>Change List</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <TooltipProvider delayDuration={1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button"
                          size="icon"
                          className="bg-transparent rounded-lg h-8 w-8">
                    <Checkbox radius="xl" size="sm" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark As Completed</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>


          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <div className="text-sm font-semibold text-default-700 my-1 capitalize">
              {title}
            </div>
          </div>
          <div className="text-[13px] text-default-500">{desc}</div>
          {image && (
            <div className="h-[190px] w-full mt-3 rounded">
              <Image
                alt=""
                src={image}
                className="h-full w-full object-cover rounded"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1 mt-2">
            <Badge
              color={priority?.color}
              className="text-[10px] px-1 py-0 rounded leading-4 capitalize"
            >
              {priority}
            </Badge>
          </div>

        </CardContent>
        <CardFooter className="p-0 mt-2">
          <div className="w-full flex flex-wrap items-center gap-x-3 gap-y-2">
            <div
              className="flex items-center gap-1 text-xs text-default-600"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar className="w-3.5 h-3.5 text-default-500" />
              {start}
            </div>
            <div
              className="flex items-center gap-1 text-xs text-default-600"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar className="w-3.5 h-3.5 text-default-500" />
              {end}
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Task;
