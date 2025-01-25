import React from 'react';
import { Icon } from "@iconify/react";

const DateChangeButtons = ({ onSave, onReset, editDate, editDueTime, editStartTime }) => {
  return (

    <div className="flex items-center gap-1 mb-3">
      {(editDate || editDueTime || editStartTime) ? (
        <div className="ml-2 flex items-center space-x-2">
          <Icon
            icon="heroicons:arrow-path-rounded-square"
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="w-5 h-5 text-red-500 hover:text-red-700"
          />
          <Icon
            icon="heroicons:cloud-arrow-up"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className="w-5 h-5 text-blue-500 hover:text-blue-700"
          />
        </div>) : <></>
      }
    </div>
  );
};

export default DateChangeButtons;
