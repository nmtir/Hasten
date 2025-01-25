'use client';

import React, { useEffect, useState } from 'react';
import {
  createUserPriority,
  deletePriority,
  updatePriority,
  updateTaskPriority,
  getPriority,
} from 'config/category-config';
import { Button } from 'components/ui/button';
import { Check, X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'components/ui/command';
import { Input } from 'components/ui/input';
import { CustomPopover } from 'components/ui/popover';
import CreatePriority from '../create-priority';
import { cn } from 'lib/utils';
import { Icon } from '@iconify/react';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';
import { Badge } from 'components/ui/badge';
import { isColorDark } from 'components/common/common';
import { wait } from 'components/common/common';

const Priority = ({ priorities, task, isNew, onEdit, user }) => {
  const [priority, setPriority] = useState(null);
  const [openPriorityColor, setOpenPriorityColor] = useState(false);
  const [editPriorityId, setEditPriorityId] = useState('');
  const [newPriorityName, setNewPriorityName] = useState('');
  const [newPriorityColor, setNewPriorityColor] = useState('#2196F3');
  const [openEdit, setOpenEdit] = useState('Create');
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const toggleOpenPriorityColor = () =>
    setOpenPriorityColor(!openPriorityColor);

  useEffect(() => {
    function fetchPriority() {
      if (task != null) {
        getPriority(task.priorityId)
          .then((r) => {
            setPriority(r);
            setIsDark(isColorDark(r.color));
          })
          .catch((error) => console.log('Error fetching ...', error));
      }
    }

    fetchPriority();
  }, [task]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const togglePopover = () => setOpen(!open);
  const closeCreatePriority = () => {
    setOpen2(false);
    wait().then(() => (document.body.style.pointerEvents = 'auto'));
  };
  const handleSelect = (p) => {
    if (isNew) {
      setPriority(p);
      onEdit(p);
    } else {
      updateTaskPriority(task.id, p.id)
        .then((r) => {
          setPriority(r);
        })
        .catch((error) => console.log(error));
      console.log(task.id, p.id);
    }
  };
  const handleOpenEdit = (p) => {
    console.log('edit');
    setOpenEdit('Edit');
    setEditPriorityId(p.id);
    setNewPriorityColor(p.color);
    setNewPriorityName(p.name);
    toggleOpenPriorityColor();
  };

  const handleDelete = (p) => {
    deletePriority(p)
      .then(() => {
        setDeleteId(null);
        setNewPriorityName('');
        setNewPriorityColor('#2196F3');
      })
      .catch((error) => console.log(error));
  };

  const handlePrioritySubmission = (e) => {
    e.preventDefault();
    const userId = isNew ? user.id : priority.userId;
    const newPriority = {
      name: newPriorityName,
      color: newPriorityColor,
    };
    switch (openEdit) {
      case 'Create':
        createUserPriority(newPriority, userId)
          .then(() => {
            toggleOpenPriorityColor();
            setNewPriorityName('');
            setNewPriorityColor('#2196F3');
            console.log('Create');
          })
          .catch((error) => console.log(error));
        break;
      case 'Edit':
        updatePriority(editPriorityId, newPriority)
          .then(() => {
            toggleOpenPriorityColor();
            setEditPriorityId('');
            setNewPriorityName('');
            setNewPriorityColor('#2196F3');
            console.log('put');
          })
          .catch((error) => console.log(error));
        break;
    }
  };
  const FirstPart = () => {
    return (
      <div>
        <div className="flex items-center justify-between px-2 py-1 border-b border-default-100 bg-default-50">
          <div className="text-sm font-medium text-default-900">
            {openEdit} priority
          </div>
          <Button
            type="button"
            size="icon"
            className="rounded-full w-8 h-8"
            onClick={(e) => {
              e.stopPropagation();
              toggleOpenPriorityColor();
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-2">
          <form onSubmit={handlePrioritySubmission}>
            <div>
              <Input
                type="text"
                placeholder="type a name"
                value={newPriorityName}
                onChange={(e) => setNewPriorityName(e.target.value)}
              />
            </div>
            <div className="text-sm font-medium text-default-700 my-2">
              Select Color
            </div>
            <Input
              type="color"
              name="color"
              className="p-0 border-none rounded-md"
              value={newPriorityColor}
              onChange={(e) => setNewPriorityColor(e.target.value)}
              defaultValue="#6338f0"
            />
            <div className="flex gap-4 mt-4">
              <Button
                variant="soft"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpenPriorityColor();
                }}
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const SecondPart = () => {
    return (
      <>
        <Command className="p-0">
          <CommandInput placeholder="Search priorities..."></CommandInput>
          <CommandEmpty>No Item found</CommandEmpty>
          <CommandGroup className="max-h-48 overflow-y-auto no-scrollbar">
            {priorities.map((item, index) => {
              return (
                <CommandItem
                  onSelect={() => handleSelect(item)}
                  key={`assigned-list-item-${index}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          priority?.id === item.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      <div>{item.name}</div>
                    </div>

                    <div className="flex items-center">
                      <div
                        style={{
                          backgroundColor: item.color,
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
                            e.stopPropagation();
                            handleOpenEdit(item);
                          }}
                          className="w-5 h-5 text-transparent hover:text-blue-400"
                        />
                        <Icon
                          icon="heroicons:trash"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(item.id);
                            setOpenDelete(true);
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
        <Button
          className="bg-muted text-sm font-medium text-default-600 px-4 py-1.5 border-b border-default-200 hover:bg-default-50 hover:underline hover:decoration-primary cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Stop the event from propagating to the outer div
            setNewPriorityName('');
            setNewPriorityColor('#2196F3');
            setOpenEdit('Create');
            toggleOpenPriorityColor();
          }}
        >
          Create Priority
        </Button>
      </>
    );
  };
  if (!isNew) {
    return (
      <>
        {' '}
        <CustomPopover
          trigger={
            <Button
              type="button"
              onClick={togglePopover}
              className="text-sm font-medium text-default-500  bg-transparent hover:bg-transparent"
            >
              <Badge
                className="capitalize"
                style={{
                  borderColor: isDark ? 'white' : 'black',
                  backgroundColor: priority ? priority.color : '#FFFFFF',
                  color: isDark ? 'white' : 'black',
                }}
              >
                {priority ? priority.name : 'No Priority'}
              </Badge>
            </Button>
          }
          open={open}
          className={'left-[unset] right-0'}
          onClose={() => setOpen(false)}
        >
          {openPriorityColor ? <FirstPart /> : <SecondPart />}
        </CustomPopover>
        <CreatePriority
          open={open2}
          onClose={closeCreatePriority}
          priority={null}
          priorityId={null}
          task={task}
        />
        <DeleteConfirmationDialog
          question="Are you sure you want to delete this priority?"
          paragraph="This action cannot be undone."
          open={openDelete}
          onClose={() => {
            setOpenDelete(false);
            setDeleteId(null);
          }}
          onConfirm={() => handleDelete(deleteId)}
        />
      </>
    );
  } else {
    return (
      <>
        {' '}
        <CustomPopover
          trigger={
            <Button
              type="button"
              onClick={togglePopover}
              className="text-sm font-medium text-default-500  bg-transparent hover:bg-transparent"
            >
              <Badge
                className="capitalize"
                style={{
                  borderColor: 'white',
                  backgroundColor: priority ? priority.color : '#FFFFFF',
                  color: isDark ? 'white' : 'black',
                }}
              >
                {priority ? priority.name : 'No Priority'}
              </Badge>
            </Button>
          }
          open={open}
          className={'left-[unset] right-0'}
          onClose={() => setOpen(false)}
        >
          {openPriorityColor ? <FirstPart /> : <SecondPart />}
        </CustomPopover>
        <CreatePriority
          open={open2}
          onClose={closeCreatePriority}
          priority={null}
          priorityId={null}
          task={task}
        />
        <DeleteConfirmationDialog
          question="Are you sure you want to delete this priority?"
          paragraph="This action cannot be undone."
          open={openDelete}
          onClose={() => {
            setOpenDelete(false);
            setDeleteId(null);
          }}
          onConfirm={() => handleDelete(deleteId)}
        />
      </>
    );
  }
};

export default Priority;
