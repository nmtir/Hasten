import 'server-only';
import { cache } from 'react';
import { handleApiError } from 'config/axios.config';
import { api } from 'config/axios.config';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
const handleEmptyResponse = (data, entity) => {
  if (!data || data.length === 0) {
    console.warn(`No ${entity} found.`);
    return [];
  }
  return data;
};
export const getUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const user = jwtDecode(token.value);
    return user;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getTasksByUser = cache(async (id) => {
  try {
    const response = await api.get(`/tasks/user/${id}`);
    return handleEmptyResponse(response.data, 'task');
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getTasks = cache(async () => {
  try {
    const response = await api.get('/tasks');
    return handleEmptyResponse(response.data, 'task');
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getBoardsByCategory = cache(async (id) => {
  try {
    const response = await api.get(`/boards/category/${id}`);
    const boards = handleEmptyResponse(response.data, 'board');
    const priorityOrder = ['JustAdded', 'InProgress', 'Completed', 'Overdue'];
    const priorityBoards = [];
    const otherBoards = [];

    boards.forEach((board) => {
      if (priorityOrder.includes(board.function)) {
        priorityBoards.push(board);
      } else {
        otherBoards.push(board);
      }
    });

    // Sort priority boards by the specified order
    const sortedPriorityBoards = priorityBoards.sort(
      (a, b) =>
        priorityOrder.indexOf(a.function) - priorityOrder.indexOf(b.function),
    );

    const sortedOtherBoards = otherBoards.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return [...sortedPriorityBoards, ...sortedOtherBoards];
  } catch (error) {
    throw handleApiError(error);
  }
});

export const getBoards = cache(async () => {
  try {
    const response = await api.get('/boards');
    return handleEmptyResponse(response.data, 'board');
  } catch (error) {
    throw error;
  }
});
export const getPriority = cache(async (id) => {
  try {
    const response = await api.get(`/priorities/single/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getBoard = cache(async (id) => {
  try {
    const response = await api.get(`/boards/single/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getUserPriorities = cache(async (id) => {
  try {
    const response = await api.get(`/priorities/user/${id}`);
    return handleEmptyResponse(response.data, 'priority');
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getTags = cache(async (id) => {
  try {
    const response = await api.get(`/tags/user/${id}`);
    return handleEmptyResponse(response.data, 'tag');
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getCategory = cache(async (id) => {
  try {
    const response = await api.get(`/categories/single/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getCategoriesByUser = cache(async (id) => {
  try {
    const response = await api.get(`/categories/user/${id}`);
    return handleEmptyResponse(response.data, 'category');
  } catch (error) {
    throw handleApiError(error);
  }
});
export const getSubtasksByParent = cache(async (taskId) => {
  try {
    console.log('subtasks subtasks subtasks');
    const response = await api.get(`/tasks/parents/single?taskId=${taskId}`);
    return handleEmptyResponse(response.data, 'subtask');
  } catch (error) {
    throw handleApiError(error);
  }
});

export const getTasksByBoards = cache(async (boardIds) => {
  if (!boardIds || boardIds.length === 0) {
    console.warn('getTasksByBoards: No board IDs provided.');
    return [];
  }
  const boardIdsParam = boardIds.join(',');
  try {
    const response = await api.get(`/tasks/boards?boardIds=${boardIdsParam}`);
    return handleEmptyResponse(response.data, 'task');
  } catch (error) {
    throw handleApiError(error);
  }
});
