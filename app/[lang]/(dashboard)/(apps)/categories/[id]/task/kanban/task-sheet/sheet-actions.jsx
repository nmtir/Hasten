'use client';
import AssignTags from '../common/assign-tags';
import { Icon } from '@iconify/react';
import { List } from 'lucide-react';
import Priority from '../common/priority';
import AssignList from '../common/assign-list';
import React from 'react';
import TaskDatePicker from 'components/TaskDatePicker';

const SheetActions = ({
  categoryId,
  user,
  tags,
  boards,
  task,
  taskId,
  priorities,
}) => {
  return (
    <div className="py-5 px-4 lg:px-6 border-b border-default-200">
      <div className="grid  grid-cols-2  md:grid-cols-3 md:gap-2 gap-y-6">
        {/* assignd members */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            <div className="bg-default-100 h-6 w-6 rounded-full grid place-content-center">
              <Icon
                icon="heroicons:scale"
                className="text-primary w-3.5 h-3.5"
              />
            </div>
            <span className="text-sm font-medium text-default-900">
              Priority
            </span>
          </div>
          <Priority
            priorities={priorities}
            task={task}
            taskId={taskId}
            isNew={false}
            onEdit={null}
            user={null}
          />
        </div>
        {/*  assigned list*/}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-default-100 h-6 w-6 rounded-full grid place-content-center">
              <List className="text-primary w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium text-default-900">Board</span>
          </div>
          <AssignList
            onEdit={null}
            categoryId={categoryId}
            boards={boards}
            selectedBoard={null}
            task={task}
            isNew={false}
          />
        </div>
        {/* task date */}
        <div>
          <AssignTags
            onEdit={null}
            user={user}
            tags={tags}
            task={task}
            taskId={taskId}
            isNew={false}
          />
          {/*<TaskDate allTasks={allTasks} task={task} />*/}
        </div>
      </div>
      <div className="mt-6">
        <TaskDatePicker task={task} />
      </div>
    </div>
  );
};

export default SheetActions;
