'use client';
import { ChevronDown } from 'lucide-react';
import React, { lazy, Suspense, useContext, useState } from 'react';
import { Progress } from 'components/ui/progress';
import { Collapsible, CollapsibleContent } from 'components/ui/collapsible';
import TaskItem from './task-item';
import AddSubTask from './add-sub-task';
import { PathContext } from 'provider/providers';

const LazyTaskSheet = lazy(() => import('../index'));

const SubTasks = ({ fetch, task, subtasks, taskId, boards, priorities }) => {
  const [showComplete, setShowComplete] = useState(false);
  const [loadTaskSheet, setLoadTaskSheet] = useState(false);

  const { setTaskPath } = useContext(PathContext);
  const handleLoadTaskSheet = (value) => {
    setLoadTaskSheet(value);
  };
  const completedSubtasks = subtasks.filter(
    (taskItem) => taskItem.completed === true,
  );
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShowCompleteTask = () => setShowComplete(!showComplete);
  const [open, setOpen] = useState(false);
  const addNewTaskToPath = (taskName) => {
    setTaskPath((prevPath) => [...prevPath, taskName]);
  };
  const removeLastTaskFromPath = () => {
    setTaskPath((prevPath) => prevPath.slice(0, -1));
  };
  const handleOpenSubTaskSheet = (task) => {
    addNewTaskToPath(task.title);
    console.log('added!:');
    setSelectedTaskId(task.id);
    setSelectedTask(task);
    setOpen(true);
    handleLoadTaskSheet(true);
  };

  const handleCloseSubtaskSheet = () => {
    removeLastTaskFromPath();
    setSelectedTaskId(null);
    setSelectedTask(null);
    setOpen(false);
    handleLoadTaskSheet(false);
  };

  const totalSubtasks = subtasks.length;

  return (
    <>
      <div className="pt-3">
        <div className="flex mb-2 px-6">
          <div className="flex-1 text-base font-medium text-default-700 capitalize">
            Progress
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-none text-xs font-medium text-default-500">
              {completedSubtasks.length}/{totalSubtasks}
            </div>
            <div className="flex-1">
              <Progress
                value={
                  totalSubtasks > 0
                    ? (completedSubtasks.length / totalSubtasks) * 100
                    : 0
                }
                size="sm"
              />
            </div>
          </div>
        </div>
        <div>
          {subtasks
            .filter((taskItem) => !taskItem.completed)
            .map((subtask) => (
              <TaskItem
                fetch={fetch}
                subtask={subtask}
                key={`task-item-key-${subtask.id}`}
                handlerSubSheet={handleOpenSubTaskSheet}
              />
            ))}
        </div>
        <AddSubTask fetch={fetch} task={task} taskId={taskId} />
        <div
          className="px-6 py-4 cursor-pointer text-xs font-medium text-default-500 flex items-center gap-1"
          onClick={handleShowCompleteTask}
        >
          {completedSubtasks.length} Completed Subtask{' '}
          <ChevronDown className="w-4 h-4" />
        </div>

        <Collapsible open={showComplete} onOpenChange={setShowComplete}>
          <CollapsibleContent className="CollapsibleContent">
            {completedSubtasks.map((subtask) => (
              <TaskItem
                subtask={subtask}
                key={`task-item-complete-key-${subtask.id}`}
                handlerSubSheet={handleOpenSubTaskSheet}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
      {loadTaskSheet && selectedTask != null && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyTaskSheet
            open={open}
            onClose={handleCloseSubtaskSheet}
            task={selectedTask}
            taskId={selectedTaskId}
            boards={boards}
            priorities={priorities}
            subtask={true}
          />
        </Suspense>
      )}
    </>
  );
};

export default SubTasks;
