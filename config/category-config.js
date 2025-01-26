'use server';
import { api } from 'config/axios.config';
import { handleApiError } from 'config/axios.config';
import { revalidatePath } from 'next/cache';

export const createCategory = async (category, id, fetchPath) => {
  console.log('createCategory req data:', 'category:', category, 'id:', id);
  try {
    const response = await api.post(`/categories/user/${id}`, category);
    console.log('createCategory res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteCategory = async (id, fetchPath) => {
  console.log('deleteCategory req data:', id);
  try {
    const response = await api.delete(`/categories/${id}`);
    console.log('deleteCategory res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateCategory = async (id, category, fetchPath) => {
  console.log('updateCategory req data:', id, 'category:', category);
  try {
    const response = await api.put(`/categories/${id}`, category);
    console.log('updateCategory res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createCategoryBoard = async (board, id, fetchPath) => {
  console.log('createCategoryBoard req data:', 'board:', board, 'id:', id);
  try {
    const response = await api.post(`/boards/category/${id}`, board);
    console.log('createCategoryBoard res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const createUserPriority = async (priority, id, fetchPath) => {
  console.log('createUserPriority req data:', 'priority:', priority, 'id:', id);
  try {
    const response = await api.post(`/priorities/user/${id}`, priority);
    console.log('createUserPriority res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteBoard = async (id, fetchPath) => {
  console.log('deleteBoard req data:', id);
  try {
    const response = await api.delete(`/boards/single/${id}`);
    console.log('deleteBoard res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deletePriority = async (id, fetchPath) => {
  console.log('deletePriority req data:', id);
  try {
    const response = await api.delete(`/priorities/single/${id}`);
    console.log('deletePriority res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateBoard = async (id, board, fetchPath) => {
  console.log('updateBoard req data:', id, 'board:', board);
  try {
    const response = await api.put(`/boards/edit/${id}`, board);
    console.log('updateBoard res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updatePriority = async (id, priority, fetchPath) => {
  console.log('updatePriority req data:', id, 'priority:', priority);
  try {
    const response = await api.put(`/priorities/edit/${id}`, priority);
    console.log('updatePriority res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateTaskBoard = async (taskId, boardId, fetchPath) => {
  console.log('updateTaskBoard req data:', taskId, 'boardId:', boardId);
  try {
    const response = await api.put(`/tasks/board/${taskId}/${boardId}`);
    console.log('updateTaskBoard res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateTaskPriority = async (taskId, priorityId, fetchPath) => {
  console.log(
    'updateTaskPriority req data:',
    taskId,
    'priorityId:',
    priorityId,
  );
  try {
    const response = await api.put(`/tasks/priority/${taskId}/${priorityId}`);
    console.log('updateTaskPriority res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const swapBoard = async (data, fetchPath) => {
  console.log('swapBoard req data:', data);
  try {
    const response = await api.patch('/boards', data);
    console.log('swapBoard res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateTaskDates = async (start, end, taskId, fetchPath) => {
  console.log('updateTaskDates req data:', start, end, taskId);
  try {
    const response = await api.put(`/tasks/date/${start}/${end}/${taskId}`);
    console.log('updateTaskDates res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteTask = async (id, fetchPath) => {
  console.log('deleteTask req data:', id);
  try {
    const response = await api.delete(`/tasks/${id}`);
    console.log('deleteTask res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateTask = async (taskId, updatedFields, fetchPath) => {
  console.log('updateTask req data:', taskId, 'updatedFields:', updatedFields);
  try {
    const response = await api.put(`/tasks/edit/${taskId}`, updatedFields);
    console.log('updateTask res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateTaskTag = async (taskId, tagId, fetchPath) => {
  console.log('updateTaskTag req data:', taskId, 'tagId:', tagId);
  try {
    const response = await api.put(`/tasks/tag/${taskId}/${tagId}`);
    console.log('updateTaskTag res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const editTag = async (tag, tagId, fetchPath) => {
  console.log('editTag req data:', tag, tagId);
  try {
    const response = await api.put(`/tags/edit/${tagId}`, tag);
    console.log('editTag res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deleteTag = async (tagId, fetchPath) => {
  console.log('deleteTag req data:', tagId);
  try {
    const response = await api.delete(`/tags/${tagId}`);
    console.log('deleteTag res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addTaskTag = async (tag, userId, fetchPath) => {
  console.log('addTaskTag req data:', tag, userId);
  try {
    const response = await api.post(`/tags/user/${userId}`, tag);
    console.log('addTaskTag res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createSubTask = async (subtask, fetchPath) => {
  console.log('createSubTask req data:', subtask);
  try {
    const response = await api.post('/tasks/add', subtask);
    console.log('createSubTask res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const createTask = async (task, fetchPath) => {
  console.log('createTask req data:', task);
  try {
    const response = await api.post('/tasks/add', task);
    console.log('createTask res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deleteSubTask = async (id, fetchPath) => {
  console.log('deleteSubTask req data:', id);
  try {
    const response = await api.delete(`/tasks/${id}`);
    console.log('deleteSubTask res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateSubTask = async (subtaskId, updatedFields, fetchPath) => {
  console.log(
    'updateSubTask req data:',
    subtaskId,
    'updatedFields:',
    updatedFields,
  );
  try {
    const response = await api.put(`tasks/edit/${subtaskId}`, updatedFields);
    console.log('updateSubTask res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const postComment = async (comment, fetchPath) => {
  console.log('postComment req data:', comment);
  try {
    const response = await api.post('/comments', comment);
    console.log('postComment res data:', response.data);
    if (fetchPath) revalidatePath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
