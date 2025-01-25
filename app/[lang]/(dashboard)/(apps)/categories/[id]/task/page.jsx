import Kanban from './kanban/kanban';
import React from 'react';
import {
  getTasksByBoards,
  getUserPriorities,
  getBoardsByCategory,
  getTasksByUser,
  getTags,
  getUser,
} from 'config/data.config';

const Task = async ({ params }) => {
  const user = await getUser();
  const id = (await params).id;
  const boards = await getBoardsByCategory(id);
  const boardIds = boards.map((board) => board.id);
  const allTasks = await getTasksByUser(user.id);
  const priorities = await getUserPriorities(user.id);
  const tags = await getTags(user.id);
  const tasks = await getTasksByBoards(boardIds);
  return (
    <Kanban
      boards={boards}
      priorities={priorities}
      tasks={tasks}
      allTasks={allTasks}
      user={user}
      categoryId={id}
      tags={tags}
    />
  );
};

export default Task;
