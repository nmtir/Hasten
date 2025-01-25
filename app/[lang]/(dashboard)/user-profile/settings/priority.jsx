import { isColorDark } from 'components/common/common';
import { Badge } from 'components/ui/badge';
import { Icon } from '@iconify/react';
import React from 'react';
const Priority = ({
  priority,
  setOpenEdit,
  handleDelete,
  setEditId,
  setNewName,
  setNewColor,
}) => {
  const [Hovered, setHovered] = React.useState(false);
  return (
    <Badge
      style={{
        backgroundColor: priority.color,
        color: isColorDark(priority.color) ? 'white' : 'black',
      }}
      key={`priority-${priority.id}`}
      className="text-s font-medium w-20 h-7 grid place-items-center hover:bg-primary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {Hovered && (
        <div className="flex flex-row justify-between w-full h-full">
          <Icon
            className="w-4 h-4  !text-white bg-transparent p-0 rounded-full cursor-pointer"
            icon="line-md:edit-filled"
            onClick={() => {
              setEditId(priority.id);
              setNewName(priority.name);
              setNewColor(priority.color);
              setOpenEdit(true);
            }}
          />
          <Icon
            className="w-4 h-4  !text-white bg-transparent p-0 rounded-full"
            icon="pepicons-pop:line-y"
          />

          <Icon
            className="w-4 h-4 !text-white   bg-transparent p-0 rounded-full cursor-pointer"
            icon="line-md:close"
            onClick={() => {
              handleDelete(priority.id);
            }}
          />
        </div>
      )}
      {!Hovered && <div>{priority.name}</div>}
    </Badge>
  );
};
export default Priority;
