import { updateTask } from 'config/category-config';
import { useState, useEffect, startTransition } from 'react';

export function useTaskStatus({ task, fetchPath, currentTime, boards }) {
  const { boardId, start, end } = task;
  const board = boards.find((b) => b.id === boardId);
  const status = board.function;
  console.log('Task status: ', status);

  const [statusIcon, setStatusIcon] = useState(
    'line-md:coffee-half-empty-filled-loop',
  );
  const [statusText, setStatusText] = useState('Nothing To Report');
  const [overdue, setOverdue] = useState(false);
  useEffect(() => {
    const calculateStatus = () => {
      const now = currentTime || new Date();
      const isStartNear =
        new Date(start) - now < 15 * 60 * 1000 && new Date(start) > now; // Less than 15 minutes and in the future
      const isStartOverdue = now > new Date(start); // Start time has passed
      const isEndNear =
        new Date(end) - now < 15 * 60 * 1000 && new Date(end) > now; // Less than 15 minutes and in the future
      const isEndOverdue = now > new Date(end); // End time has passed
      if (status === 'Completed') {
        if (statusIcon !== 'line-md:emoji-smile-wink') {
          setStatusIcon('line-md:emoji-smile-wink');
          setStatusText('Completed');
        }
      } else if (status === 'Overdue') {
        if (statusIcon !== 'line-md:emoji-cry') {
          setStatusIcon('line-md:emoji-cry');
          setStatusText('Overdue');
        }
      } else if (status === 'InProgress') {
        if (statusIcon !== 'line-md:loading-twotone-loop') {
          setStatusIcon('line-md:loading-twotone-loop');
          setStatusText('In Progress');
        }
      } else if (isEndOverdue) {
        if (statusIcon !== 'line-md:emoji-cry') {
          setStatusIcon('line-md:emoji-cry');
          setStatusText('Overdue');
          setOverdue(true);
        }
      } else if (isStartNear) {
        if (statusIcon !== 'line-md:hazard-lights-loop') {
          setStatusIcon('line-md:hazard-lights-loop');
          setStatusText('Starts In Less Than 15 Minutes');
        }
      } else if (isStartOverdue && !isEndOverdue && !isEndNear) {
        if (statusIcon !== 'line-md:hazard-lights-filled-loop') {
          setStatusIcon('line-md:hazard-lights-filled-loop');
          setStatusText('Starting Time Is Passed');
        }
      } else if (isStartOverdue && !isEndOverdue && isEndNear) {
        if (statusIcon !== 'line-md:hazard-lights-off-filled-loop') {
          setStatusIcon('line-md:hazard-lights-off-filled-loop');
          setStatusText('End Time Is Near');
        }
      } else {
        if (statusIcon !== 'line-md:coffee-half-empty-filled-loop') {
          setStatusIcon('line-md:coffee-half-empty-filled-loop');
          setStatusText('Nothing To Report');
        }
      }
      if (
        status !== 'Completed' &&
        status !== 'InProgress' &&
        status !== 'Overdue' &&
        overdue
      ) {
        const board = boards.find((b) => b.function === 'Overdue');
        const newData = {
          ...task,
          boardId: board.id,
        };
        startTransition(async () => {
          try {
            await updateTask(task.id, newData, fetchPath);
          } catch (error) {
            console.log(error);
          }
        });
      }
    };
    calculateStatus();
  }, [currentTime, task]);

  return { statusIcon, statusText };
}
