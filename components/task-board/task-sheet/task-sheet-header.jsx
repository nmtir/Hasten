"use client";

import { Button } from "components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import { cn } from "lib/utils";

import { Icon } from "@iconify/react";
import { MoreHorizontal } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import CollapsingBreadcrumbs from "app/[lang]/(dashboard)/(components)/breadcrumb/collapsing-breadcrumbs";
import DefaultBreadCrumb from "app/[lang]/(dashboard)/(components)/breadcrumb/defalut-breadcrumb";
import { PathContext } from "provider/providers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/ui/dropdown-menu";
import DeleteConfirmationDialog from "components/delete-confirmation-dialog";
import { deleteTask } from "config/category-config";

const TaskSheetHeader = ({ toggleCollapse }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [collapsing, setCollapsing] = useState(false);
  const intervalRef = useRef(null);
  const { taskPath } = useContext(PathContext);

  const [open, setOpen] = React.useState(false);
  // useEffect to set collapsing state based on path length
  useEffect(() => {
    if (taskPath && taskPath.length >= 4) {
      setCollapsing(true);
    } else {
      setCollapsing(false);
    }
  }, [taskPath]);
  // timer start
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setElapsedTime(0);
      setIsRunning(false);
    } else if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      setIsRunning(true);
    }
  };
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes % 60).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  // timer end
  const onAction = (dltId) => {
    deleteTask(dltId).catch(error => console.log(error));
  };
  return (
    <>
      <div className="flex items-center gap-2">
        {taskPath && taskPath.length > 0 && (
          collapsing ? (
            <CollapsingBreadcrumbs />
          ) : (
            <DefaultBreadCrumb />
          )
        )}
      </div>
      <div className="flex items-center gap-2 pr-5">
        {/* timer */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-default-600">
            {formatTime(elapsedTime)}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleTimer}
                  type="button"
                  size="icon"
                  className={cn(
                    "bg-transparent rounded-full hover:bg-default-200 h-8 w-8",
                    {
                      "bg-default-200": isRunning,
                    }
                  )}
                >
                  {isRunning ? (
                    <Icon
                      icon="heroicons:play-pause"
                      className="h-[14px] w-[14px] text-default-500"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:play"
                      className="h-[14px] w-[14px] text-default-500"
                    />
                  )}
                </Button>
              </TooltipTrigger>
              {!isRunning && (
                <TooltipContent>
                  <p>Start Trucking Time</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* notifications */}
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
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          onClick={toggleCollapse}
          className="cursor-pointer hidden xl:block"
        >
          <Icon
            icon="heroicons:arrows-right-left-solid"
            className="w-5 h-5 text-default-500"
          />
        </div>
      </div>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this task?"
        paragraph="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(id)}
      />
    </>
  );
};

export default TaskSheetHeader;
