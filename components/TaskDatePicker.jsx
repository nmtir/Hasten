import React, { startTransition } from 'react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { updateTaskDates } from 'config/category-config';
import TaskRangePicker from './TaskRangePicker';
import DateChangeButtons from './DateChangeButtons';
import TaskTimePicker from './TaskTimePicker';

const TaskDatePicker = ({ task }) => {
  const [startDate, setStartDate] = React.useState(
    parseAbsoluteToLocal(task.start),
  );
  const [endDate, setEndDate] = React.useState(parseAbsoluteToLocal(task.end));
  const [startTime, setStartTime] = React.useState(
    parseAbsoluteToLocal(task.start),
  );
  const [endTime, setEndTime] = React.useState(parseAbsoluteToLocal(task.end));

  const [editDate, setEditDate] = React.useState(false);
  const [editStartTime, setEditStartTime] = React.useState(false);
  const [editDueTime, setEditDueTime] = React.useState(false);
  const [newTask, setNewTask] = React.useState(task);

  const onEditStartTime = (t) => {
    setStartTime(t);
    setEditStartTime(
      parseAbsoluteToLocal(newTask.start).hour !== t.hour ||
        parseAbsoluteToLocal(newTask.start).minute !== t.minute,
    );
  };
  const onEditDueTime = (t) => {
    setEndTime(t);
    setEditDueTime(
      parseAbsoluteToLocal(newTask.end).hour !== t.hour ||
        parseAbsoluteToLocal(newTask.end).minute !== t.minute,
    );
  };
  const onEditDate = (t) => {
    setStartDate(t.start);
    setEndDate(t.end);
    setEditDate(
      parseAbsoluteToLocal(newTask.start).year !== t.start.year ||
        parseAbsoluteToLocal(newTask.start).month !== t.start.month ||
        parseAbsoluteToLocal(newTask.start).day !== t.start.day ||
        parseAbsoluteToLocal(newTask.end).year !== t.end.year ||
        parseAbsoluteToLocal(newTask.end).month !== t.end.month ||
        parseAbsoluteToLocal(newTask.end).day !== t.end.day,
    );
  };
  const onSave = () => {
    const newStartDate = new Date(
      startDate.year,
      startDate.month,
      startDate.day,
      startTime.hour,
      startTime.minute,
    );
    const newEndDate = new Date(
      endDate.year,
      endDate.month,
      endDate.day,
      endTime.hour,
      endTime.minute,
    );
    startTransition(async () => {
      try {
        const r = await updateTaskDates(newStartDate, newEndDate, task.id);
        setStartDate(parseAbsoluteToLocal(r.start));
        setEndDate(parseAbsoluteToLocal(r.end));
        setStartTime(parseAbsoluteToLocal(r.start));
        setEndTime(parseAbsoluteToLocal(r.end));
        setNewTask(r);
      } catch (error) {
        console.log(error);
      }
    });

    setEditStartTime(false);
    setEditDate(false);
    setEditDueTime(false);
    return console.log(task);
  };
  const onReset = () => {
    setStartDate(parseAbsoluteToLocal(newTask.start));
    setEndDate(parseAbsoluteToLocal(newTask.end));
    setStartTime(parseAbsoluteToLocal(newTask.start));
    setEndTime(parseAbsoluteToLocal(newTask.end));
    setEditStartTime(false);
    setEditDate(false);
    setEditDueTime(false);
  };

  return (
    <div>
      <div className="w-full max-w-xl flex flex-row gap-4">
        <div>
          <TaskRangePicker
            startDate={startDate}
            endDate={endDate}
            onEditDate={onEditDate}
          />
        </div>
        <DateChangeButtons
          onSave={onSave}
          onReset={onReset}
          editDate={editDate}
          editDueTime={editDueTime}
          editStartTime={editStartTime}
        />
      </div>

      <div className="flex flex-row gap-4 mt-2">
        <TaskTimePicker
          Time={startTime}
          onEditTime={onEditStartTime}
          label={'Starting :'}
        />
        <TaskTimePicker
          Time={endTime}
          onEditTime={onEditDueTime}
          label={'Due :'}
        />
      </div>
    </div>
  );
};

export default TaskDatePicker;
