'use client';
import React, { Suspense, useContext } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import TaskHeader from './task-header';
import { useState, lazy } from 'react';
import Board from './board';
import Task from './task';
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
import { swapBoard } from 'config/category-config';
import CreateTask from 'app/[lang]/(dashboard)/(apps)/task/components/create-task';
import EditTask from 'app/[lang]/(dashboard)/(apps)/task/components/edit-task';
import { PathContext } from 'provider/providers';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const LazyTaskSheet = lazy(() => import('./task-sheet'));
const TaskBoard = ({
  tags,
  categoryId,
  user,
  allTasks,
  boards,
  tasks,
  priorities,
}) => {
  const [taskView, setTaskView] = useState('Boards');
  const { setTaskPath } = useContext(PathContext);
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
  // dnd
  const [startTransition] = React.useTransition();
  const boardsId = React.useMemo(
    () => boards?.map((board) => board.id),
    [boards],
  );
  const tasksIds = React.useMemo(() => tasks?.map((task) => task.id), [tasks]);
  const [activeBoard, setActiveBoard] = React.useState(null);
  const handleDragStart = (event) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveBoard(event.active.data.current.board);
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeBoardId = active.id;
    const overBoardId = over.id;
    if (activeBoardId === overBoardId) return;

    const oldIndex = boardsId.indexOf(activeBoardId);

    const newIndex = boardsId.indexOf(overBoardId);

    if (oldIndex !== newIndex) {
      let data = {
        activeBoardId,
        overBoardId,
      };
      startTransition(() => {
        swapBoard(data)
          .then(() => toast.success('Successfully update'))
          .catch((error) => console.log(error));
      });
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );
  const onDragOver = () => {
    console.log('ami k');
  };
  return (
    <>
      {boards?.length > 0 ? (
        <Card className="overflow-y-auto">
          <CardHeader className="border-none pt-6 mb-6">
            <TaskHeader
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
                    <SortableContext items={boardsId}>
                      {boards?.map((board) => (
                        <Board
                          key={`board-id-${board.id}`}
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
                          <SortableContext items={tasksIds}>
                            {filteredTasks(tasks, board.id)?.map(
                              (filteredTask, j) => (
                                <Task
                                  tags={tags}
                                  key={`task-key-${j}`}
                                  task={filteredTask}
                                  onUpdateTask={updateTaskHandler}
                                  boards={boards}
                                />
                              ),
                            )}
                          </SortableContext>
                        </Board>
                      ))}
                    </SortableContext>
                  </div>
                </div>

                <DragOverlay adjustScale={false}>
                  {activeBoard && (
                    <Board board={activeBoard}>
                      {filteredTasks(tasks, activeBoard.id)?.[0] && (
                        <Task
                          task={filteredTasks(tasks, activeBoard.id)?.[0]}
                          boards={boards}
                        />
                      )}
                    </Board>
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
      <EditTask open={openEditTask} onClose={handleEditSheetOpen} />
    </>
  );
};

export default TaskBoard;
