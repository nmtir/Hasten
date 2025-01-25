import React, { startTransition, useState } from 'react';
import { Button } from 'components/ui/button';
import { Check, Plus, X } from 'lucide-react';
import { cn } from 'lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'components/ui/command';
import {
  addTaskTag,
  deleteTag,
  editTag,
  updateTaskTag,
} from 'config/category-config';
import { Input } from 'components/ui/input';
import { CustomPopover } from 'components/ui/popover';
import { Badge } from 'components/ui/badge';
import { Icon } from '@iconify/react';
import { isColorDark } from 'components/common/common';

const AssignTags = ({ onEdit, user, tags, task, taskId, isNew }) => {
  const [open, setOpen] = useState(false);
  const taskTags = tags.filter((tag) => task?.tags.includes(tag.id));
  const [selectedValues, setSelectedValues] = useState(taskTags || []);
  const [openTagColor, setOpenTagColor] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#2196F3');
  const [openEdit, setOpenEdit] = useState('Create');
  const [newTagId, setNewTagId] = useState('');

  const toggleOpenTagColor = () => setOpenTagColor(!openTagColor);
  const handlePopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
    setOpenTagColor(false);
  };
  const handleSelect = (tag) => {
    if (!isNew) {
      startTransition(async () => {
        try {
          const r = await updateTaskTag(taskId, tag.id);
          setSelectedValues(r);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      if (selectedValues?.some((selectedTag) => selectedTag.id === tag.id)) {
        setSelectedValues(
          selectedValues.filter((selectedTag) => selectedTag.id !== tag.id),
        );
        onEdit(selectedValues);
      } else {
        setSelectedValues([...selectedValues, tag]); // Use spread operator to update the array
        onEdit(selectedValues);
      }
      console.log(
        '/////////////////selectedValues////////////////////',
        selectedValues,
      );
    }
  };
  const handleOpenEdit = (tag) => {
    console.log('Edit');
    console.log(tag);
    setOpenEdit('Edit');
    setNewTagId(tag.id);
    setNewTagColor(tag.color);
    setNewTagName(tag.name);
    toggleOpenTagColor();
  };
  const handleDelete = (tag) => {
    startTransition(async () => {
      try {
        await deleteTag(tag.id);
        toggleOpenTagColor();
        setNewTagName('');
        setNewTagColor('#2196F3');
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleTagSubmission = (e) => {
    e.preventDefault();
    const newTag = {
      name: newTagName,
      color: newTagColor,
    };
    switch (openEdit) {
      case 'Create':
        startTransition(async () => {
          try {
            await addTaskTag(newTag, user.id);
            toggleOpenTagColor();
            setNewTagName('');
            setNewTagColor('#2196F3');
          } catch (error) {
            console.log(error);
          }
        });
        break;
      case 'Edit':
        startTransition(async () => {
          try {
            await editTag(newTag, newTagId);
            toggleOpenTagColor();
            setNewTagId('');
            setNewTagName('');
            setNewTagColor('#2196F3');
          } catch (error) {
            console.log(error);
          }
        });
        break;
    }
  };

  return (
    <>
      <CustomPopover
        trigger={
          <div className="flex items-center gap-1">
            <div className="text-sm font-medium text-default-900">Tags</div>
            <Button
              onClick={handlePopover}
              className="h-5 w-5 rounded-full bg-default-100 hover:bg-default-200"
              size="icon"
            >
              <Plus className="w-3 h-3 text-primary" />
            </Button>
          </div>
        }
        open={open}
        onClose={closePopover}
      >
        {openTagColor ? (
          <div>
            <div className="flex items-center justify-between px-2 py-1 border-b border-default-100 bg-default-50">
              <div className="text-sm font-medium text-default-900">
                {openEdit} tag
              </div>
              <Button
                type="button"
                size="icon"
                className="rounded-full w-8 h-8"
                onClick={closePopover}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-2">
              <form onSubmit={handleTagSubmission}>
                <div>
                  <Input
                    type="text"
                    placeholder="type a name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                </div>
                <div className="text-sm font-medium text-default-700 my-2">
                  Select Color
                </div>
                <Input
                  type="color"
                  name="color"
                  className="p-0 border-none rounded-md"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  defaultValue="#6338f0"
                />
                <div className="flex gap-4 mt-4">
                  <Button variant="soft" type="button" onClick={closePopover}>
                    Cancel
                  </Button>
                  <Button>Save</Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <Command className="p-0">
              <CommandInput placeholder="Search Tags..." />
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup className="max-h-48 overflow-y-auto no-scrollbar">
                {tags.map((tag) => {
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={() => handleSelect(tag)}
                      className="mb-1"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedValues?.some(
                                (selectedTag) => selectedTag.id === tag.id,
                              )
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          <div>{tag.name}</div>
                        </div>

                        <div className="flex items-center">
                          <div
                            style={{
                              backgroundColor: tag.color,
                              width: '12px',
                              height: '12px',
                              borderRadius: '4px',
                              marginLeft: '8px',
                            }}
                          />
                          <div className="ml-2 flex items-center space-x-2">
                            <Icon
                              icon="heroicons:pencil"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent handleSelect from being triggered
                                handleOpenEdit(tag);
                              }}
                              className="w-5 h-5 text-transparent hover:text-blue-400"
                            />
                            <Icon
                              icon="heroicons:trash"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent handleSelect from being triggered
                                handleDelete(tag);
                              }}
                              className="w-5 h-5 text-transparent hover:text-red-400"
                            />
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>

            <div
              className="pl-8 py-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Stop the event from propagating to the outer div
                setNewTagName('');
                setNewTagColor('#2196F3');
                setOpenEdit('Create');
                toggleOpenTagColor();
              }}
            >
              Create a new tag
            </div>
          </>
        )}
      </CustomPopover>
      <div className="mt-3 flex gap-2">
        {selectedValues?.map((tag, index) => {
          const isDark = isColorDark(tag.color);
          return (
            <Badge
              className="capitalize"
              key={`badge-tag-key-index-${index}`}
              style={{
                borderColor: isDark ? 'white' : 'black',
                backgroundColor: tag.color,
                color: isDark ? 'white' : 'black',
              }}
            >
              {tag.name}
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default AssignTags;
