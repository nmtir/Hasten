import React from 'react';
import { DateRangePicker } from '@nextui-org/react';

const TaskRangePicker = ({ startDate, endDate, onEditDate }) => {
  return (
    <DateRangePicker
      granularity="day"
      value={{
        start: startDate,
        end: endDate,
      }}
      onChange={onEditDate}
      label="Starting Date - Due Date"
      size="sm"
      color="primary"
      disableAnimation="false"
      variant="flat"
      visibleMonths={1} />
  );
};

export default TaskRangePicker;
