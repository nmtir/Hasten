import React from 'react';
import TaskRangePicker from "./TaskRangePicker";
import TaskTimePicker from "./TaskTimePicker";

const NewTaskDatePicker = ({ startDate, dueDate, startTime, dueTime, onEdit }) => {

  const onEditStartTime = (t) => {
    onEdit(t, "startTime");

  }
  const onEditDueTime = (t) => {
    onEdit(t, "dueTime");
  }
  const onEditDate = (t) => {
    onEdit(t, "date");
  }


  return (
    <div>
      <div className="w-full max-w-xl flex flex-row gap-4">
        <TaskRangePicker
          startDate={startDate}
          endDate={dueDate}
          onEditDate={onEditDate}
        />
      </div>
      <div className="flex flex-row gap-4 mt-2">
        <TaskTimePicker
          Time={startTime}
          onEditTime={onEditStartTime}
          label={"Starting :"}
        />
      </div>
      <div className="flex flex-row gap-4 mt-2">
        <TaskTimePicker
          Time={dueTime}
          onEditTime={onEditDueTime}
          label={"Due:"}
        />
      </div>
    </div>
  );
};

export default NewTaskDatePicker;
