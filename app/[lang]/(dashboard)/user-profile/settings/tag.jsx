import { isColorDark } from 'components/common/common';
import { Badge } from 'components/ui/badge';
import { Icon } from '@iconify/react';
import React from 'react';
const Tag = ({
  tag,
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
        backgroundColor: tag.color,
        color: isColorDark(tag.color) ? 'white' : 'black',
      }}
      key={`Tag-${tag.id}`}
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
              setEditId(tag.id);
              setNewName(tag.name);
              setNewColor(tag.color);
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
              handleDelete(tag.id);
            }}
          />
        </div>
      )}
      {!Hovered && <div>{tag.name}</div>}
    </Badge>
  );
};
export default Tag;
