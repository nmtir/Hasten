"use client";
import { Sheet, SheetContent, SheetHeader } from "components/ui/sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import TaskSheetHeader from "./task-sheet-header";
import { Icon } from "@iconify/react";
import SubTasks from "./sub-tasks";
import { ScrollArea } from "components/ui/scroll-area";
import SheetTitleDesc from "./sheet-title-desc";
import { useEffect, useState } from "react";
import { cn } from "lib/utils";
import SheetActions from "./sheet-actions";
import { X } from "lucide-react";
import { getSubtasksByParent } from "config/data.config";

const TaskSheet = ({ categoryId, subtask, user, tags, allTasks, open, onClose, taskId, task, boards, priorities }) => {
  const [subTasks, setSubtasks] = useState(null);
  useEffect(() => {
    function fetchSubtasks() {
      if (task != null) {
        getSubtasksByParent(task.id)
          .then(r => setSubtasks(r))
          .catch(error => console.log(error));
      }
    }

    fetchSubtasks();
  }, [task]);
  const [collapseSheet, setCollapseSheet] = useState(false);
  const toggleCollapse = () => setCollapseSheet(!collapseSheet);
  return (
    <Sheet open={open}>
      <SheetContent
        side="right"
        onClose={onClose}
        closeIcon={<X className="h-4 w-4 relative top-4" />}
        className={cn("w-[85%] md:max-w-[1200px] p-0", {
          "md:max-w-[600px]": collapseSheet,
        })}
      >
        <SheetHeader
          className="sm:flex-row justify-between gap-3 space-y-0 border-b border-default-200  px-2 xl:px-6 py-5">
          <TaskSheetHeader
            collapseSheet={collapseSheet}
            toggleCollapse={toggleCollapse}
          />
        </SheetHeader>

        {/* left side */}
        <div className="border-r border-default-200 min-h-screen">
          <div className="h-[calc(100vh-70px)]">
            <ScrollArea className="h-full no-scrollbar">
              {/* sheet title & desc */}
              <SheetTitleDesc task={task} taskId={taskId} />
              {/* sheet actions */}
              {!subtask &&
                <SheetActions categoryId={categoryId} user={user} tags={tags} allTasks={allTasks} boards={boards}
                              priorities={priorities}
                              task={task} taskId={taskId} />
              }{/* tabs */}
              <Tabs defaultValue="subtasks">
                <TabsList className="flex justify-between w-full bg-default-100 h-12 p-0 px-2 xl:px-12 rounded-none">
                  <TabsTrigger
                    value="subtasks"
                    className=" py-0 h-full bg-transparent text-sm font-medium text-default-600 capitalize rounded-none border-b border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <Icon
                      icon="heroicons:document-text"
                      className="w-3.5 h-3.5 mr-1.5"
                    />
                    subtasks
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="subtasks">
                  {Array.isArray(subTasks) && subTasks.length > 0 && (
                    <SubTasks priorities={priorities} subTasks={subTasks} taskId={taskId} boards={boards} />
                  )}</TabsContent>
              </Tabs>
            </ScrollArea>
          </div>
        </div>
        {/* right side */}
      </SheetContent>
    </Sheet>
  );
};

export default TaskSheet;
