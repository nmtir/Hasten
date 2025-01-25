import React from 'react';
import { TimeInput } from '@nextui-org/react';

const TaskTimePicker = ({ label, Time, onEditTime }) => {
  return (
    <TimeInput
      hideTimeZone
      value={Time}
      onChange={onEditTime}
      label={label}
      size="sm"
      color="primary"
      variant="flat"
      hourCycle="24"
    />
  );
};

export default TaskTimePicker;
