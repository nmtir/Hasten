'use client';
import React, {
  startTransition,
  createContext,
  Suspense,
  useContext,
  useEffect,
} from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import KanbanHeader from './kanban-header';
import { useState, lazy } from 'react';
import KanbanBoard from './kanban-board';
import KanbanTask from './kanban-task';
import CreateBoard from './create-board';
import Blank from 'components/blank';
import { Button } from 'components/ui/button';
import { toast } from 'react-hot-toast';
// dnd
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { updateTask } from 'config/category-config';
import CreateTask from './create-task';
import EditTask from './edit-task';
import { PathContext } from 'provider/providers';
import { usePathname } from 'next/navigation';
import ConfirmDrag from './common/confirm-drag';
const CurrentTimeContext = createContext();
export const useCurrentTime = () => useContext(CurrentTimeContext);
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const LazyTaskSheet = lazy(() => import('./task-sheet'));
const Kanban = ({
  tags,
  categoryId,
  user,
  allTasks,
  boards,
  tasks,
  priorities,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  const [taskView, setTaskView] = useState('Boards');
  const { setTaskPath } = useContext(PathContext);
  const location = usePathname();
  const [open, setOpen] = useState(false);
  const [open3, setOpen3] = useState(false);
  // for board
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const handleSheetOpen = () => {
    setOpenCreateTask(!openCreateTask);
  };
  const handleEditSheetOpen = () => {
    setOpenEditTask(!openEditTask);
  };
  const [selectedBoardId, setSelectedBoardId] = React.useState(null);
  const [selectedBoard, setSelectedBoard] = React.useState(null);
  // for task
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [selectedBoardForTask, setSelectedBoardForTask] = React.useState(null);

  const [loadTaskSheet, setLoadTaskSheet] = useState(false);
  // Command to load the TaskSheet component
  const handleLoadTaskSheet = (value) => {
    setLoadTaskSheet(value);
  };
  // handler task view
  const taskViewHandler = (value) => {
    setTaskView(value);
  };

  // handle edit board
  const openEdit = (board) => {
    setSelectedBoardId(board.id);
    setSelectedBoard(board);
    setOpen(true);
  };
  // handle create board
  const openCreateBoard = () => {
    setSelectedBoardId(null);
    setSelectedBoard(null);
    setOpen(true);
  };
  // handle close create board
  const closeCreateBoard = () => {
    setSelectedBoardId(null);
    setSelectedBoard(null);
    setOpen(false);
    wait().then(() => (document.body.style.pointerEvents = 'auto'));
  };

  // handle task board opener
  const handleTaskOpener = (boardId) => {
    setSelectedTaskId(null);
    setSelectedTask(null);
    const board = boards.find((board) => board.id === boardId);
    console.log(board);
    setSelectedBoardForTask(board);
    setOpenCreateTask(true);
  };

  // update task handler
  const updateTaskHandler = (task, boardName) => {
    setTaskPath([boardName, task.title]);
    setSelectedTaskId(task.id);
    console.log(task);
    setSelectedTask(task);
    setOpen3(true);
    handleLoadTaskSheet(true);
  };
  const closeUpdateTaskHandler = () => {
    setSelectedTaskId(null);
    setSelectedTask(null);
    setOpen3(false);
    handleLoadTaskSheet(false);
  };

  const filteredTasks = (tasks, boardId) => {
    // Add your filtering logic here
    return tasks?.filter((task) => task.boardId === boardId);
  };
  const [targetBoard, setTargetBoard] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [previousBoard, setPreviousBoard] = useState(null);
  const [openDragConfirmation, setOpenDragConfirmation] = useState(false);

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    const oldBoard = boards.find((b) => b.id === task.boardId);
    setPreviousBoard(oldBoard);
    setActiveTask(task);
  };
  const onDragOver = (event) => {
    const { over } = event;
    const board = boards.find((b) => b.id === over.id);
    setTargetBoard(board);
  };
  const handleDragEnd = (event) => {
    if (targetBoard && activeTask && event) {
      if (activeTask.boardId !== targetBoard.id) {
        if (
          (previousBoard.function !== 'Overdue' &&
            previousBoard.function !== 'Completed') ||
          targetBoard.function === 'Completed' ||
          targetBoard.function === 'Overdue'
        ) {
          const updatedTask = { ...activeTask, boardId: targetBoard.id };
          tasks[activeTask.id] = updatedTask;
          React.startTransition(async () => {
            try {
              await updateTask(activeTask.id, updatedTask, location);
            } catch (error) {
              console.log(error);
            }
          });
          setActiveTask(null);
          setTargetBoard(null);
          setPreviousBoard(null);
        } else {
          setOpenDragConfirmation(true);
        }
      }
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 1000,
        tolerance: 2,
      },
    }),
  );
  return (
    <CurrentTimeContext.Provider value={currentTime}>
      {boards?.length > 0 ? (
        <Card className="overflow-y-auto">
          <CardHeader className="border-none  bg-transparent pt-6 mb-6">
            <KanbanHeader
              taskView={taskView}
              taskViewHandler={taskViewHandler}
              openCreateBoard={openCreateBoard}
            />
          </CardHeader>
          <CardContent>
            {taskView === 'Boards' && (
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
                onDragOver={onDragOver}
              >
                <div className="overflow-x-auto no-scrollbar">
                  <div className="flex flex-nowrap gap-6">
                    <SortableContext
                      items={boards.map((board) => `board-${board.id}`)}
                    >
                      {boards?.map((board) => (
                        <KanbanBoard
                          key={`board-id-${board.id}`}
                          id={`board-${board.id}`}
                          board={board}
                          onEdit={openEdit}
                          taskHandler={handleTaskOpener}
                          isTaskOpen={openCreateTask}
                          showButton={
                            !openCreateTask || selectedBoardForTask !== board.id
                          }
                          tasks={tasks.filter(
                            (task) => task.boardId === board.id,
                          )}
                          onUpdateTask={updateTaskHandler}
                          boards={boards}
                        >
                          <SortableContext
                            items={tasks.map((task) => `task-${task.id}`)}
                          >
                            {filteredTasks(tasks, board.id)?.map(
                              (filteredTask, j) => (
                                <KanbanTask
                                  tags={tags}
                                  key={`task-key-${j}`}
                                  id={`task-${filteredTask.id}`}
                                  task={filteredTask}
                                  onUpdateTask={updateTaskHandler}
                                  boards={boards}
                                />
                              ),
                            )}
                          </SortableContext>
                        </KanbanBoard>
                      ))}
                    </SortableContext>
                  </div>
                </div>

                <DragOverlay adjustScale={false}>
                  {activeTask && (
                    <KanbanTask tags={tags} task={activeTask} boards={boards} />
                  )}
                </DragOverlay>
              </DndContext>
            )}
          </CardContent>
        </Card>
      ) : (
        <Blank className="w-full rounded-lg p-4  bg-white mx-auto space-y-4">
          <div className=" text-xl font-semibold text-default-900">
            No Tasks Here Yet!
          </div>
          <div className=" text-default-600 text-sm">
            There is no tasks yet. If you create a new task then click this
            button & create a new board. then start adding tasks.
          </div>
          <Button onClick={openCreateBoard}>
            <Plus className="w-4 h-4 mr-1" /> Create Board
          </Button>
        </Blank>
      )}
      {/* update task  modal/sheet */}
      <CreateBoard
        open={open}
        onClose={closeCreateBoard}
        board={selectedBoard}
        boardId={selectedBoardId}
        task={null}
        user={user}
        categoryId={categoryId}
      />
      {/* update task  modal/sheet */}
      {loadTaskSheet && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyTaskSheet
            tags={tags}
            open={open3}
            taskId={selectedTaskId}
            task={selectedTask}
            boards={boards}
            priorities={priorities}
            onClose={closeUpdateTaskHandler}
            allTasks={allTasks}
            user={user}
            subtask={false}
            categoryId={categoryId}
          />
        </Suspense>
      )}
      <CreateTask
        categoryId={categoryId}
        tags={tags}
        user={user}
        priorities={priorities}
        board={selectedBoardForTask}
        boards={boards}
        open={openCreateTask}
        onClose={handleSheetOpen}
      />
      <ConfirmDrag
        open={openDragConfirmation}
        task={activeTask}
        targetBoard={targetBoard}
        prevBoard={previousBoard}
        setOpen={setOpenDragConfirmation}
      ></ConfirmDrag>
      <EditTask open={openEditTask} onClose={handleEditSheetOpen} />
    </CurrentTimeContext.Provider>
  );
};

export default Kanban;
