'use client';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { CustomPopover } from 'components/ui/popover';
import { Check, X } from 'lucide-react';
import React, { startTransition, useContext, useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';
import CreateBoard from '../create-board';
import { cn } from 'lib/utils';
import { Icon } from '@iconify/react';
import {
  createCategoryBoard,
  deleteBoard,
  updateBoard,
  updateTaskBoard,
} from 'config/category-config';
import { PathContext } from 'provider/providers';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';
import { Badge } from 'components/ui/badge';
import { isColorDark } from 'components/common/common';
import { wait } from 'components/common/common';
import { useUser } from '../../../../../../../../../provider/userProvider';
import { usePathname } from 'next/navigation';
const AssignList = ({
  onEdit,
  categoryId,
  selectedBoard,
  boards,
  task,
  isNew,
}) => {
  const { user } = useUser();
  const location = usePathname();
  const { taskPath } = useContext(PathContext);
  const { setTaskPath } = useContext(PathContext);
  const [board, setBoard] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openBoardColor, setOpenBoardColor] = useState(false);
  const [editBoardId, setEditBoardId] = useState('');
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardColor, setNewBoardColor] = useState('#2196F3');
  const [openEdit, setOpenEdit] = useState('Create');
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const toggleOpen = (set, x) => set(!x);
  const closeCreateBoard = () => {
    setOpen2(false);
    wait().then(() => (document.body.style.pointerEvents = 'auto'));
  };
  useEffect(() => {
    function fetchBoard() {
      const foundBoard = boards.find((b) => b.id === task.boardId);
      if (foundBoard) {
        setBoard(foundBoard);
        setIsDark(isColorDark(foundBoard.color));
      }
    }
    if (selectedBoard == null) {
      fetchBoard();
    } else setBoard(selectedBoard);
  }, [task]);
  const handleSelect = (b) => {
    if (isNew) {
      setBoard(b);
      onEdit(b);
    } else {
      const target = board.name;
      startTransition(async () => {
        try {
          const r = await updateTaskBoard(task.id, b.id, location);
          setBoard(r);
          const replacement = b.name;
          const newPath = taskPath.map((item) =>
            item === target ? replacement : item,
          );
          setTaskPath(newPath);
        } catch (error) {
          console.log(error);
        }
      });
      console.log(task.id, b.id);
    }
  };
  const handleOpenEdit = (b) => {
    setOpenEdit('Edit');
    setEditBoardId(b.id);
    setNewBoardColor(b.color);
    setNewBoardName(b.name);
    toggleOpen(setOpenBoardColor, openBoardColor);
  };

  const handleDelete = (b) => {
    startTransition(async () => {
      try {
        await deleteBoard(b, location);
        setDeleteId(null);
        setNewBoardName('');
        setNewBoardColor('#2196F3');
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleBoardSubmission = (e) => {
    e.preventDefault();
    const newBoard = {
      name: newBoardName,
      color: newBoardColor,
    };
    switch (openEdit) {
      case 'Create':
        startTransition(async () => {
          try {
            await createCategoryBoard(newBoard, categoryId, location);
            toggleOpen(setOpenBoardColor, openBoardColor);
            setNewBoardName('');
            setNewBoardColor('#2196F3');
            console.log('Create');
          } catch (error) {
            console.log(error);
          }
        });
        break;
      case 'Edit':
        startTransition(async () => {
          try {
            await updateBoard(editBoardId, newBoard, location);
            toggleOpen(setOpenBoardColor, openBoardColor);
            setEditBoardId('');
            setNewBoardName('');
            setNewBoardColor('#2196F3');
            console.log('put');
          } catch (error) {
            console.log(error);
          }
        });

        break;
    }
  };
  const FirstPart = () => {
    return (
      <div>
        <div className="flex items-center justify-between px-2 py-1 border-b border-default-100 bg-default-50">
          <div className="text-sm font-medium text-default-900">
            {openEdit} board
          </div>
          <Button
            type="button"
            size="icon"
            className="rounded-full w-8 h-8"
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen(setOpenBoardColor, openBoardColor);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-2">
          <form onSubmit={handleBoardSubmission}>
            <div>
              <Input
                type="text"
                placeholder="type a name"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              />
            </div>
            <div className="text-sm font-medium text-default-700 my-2">
              Select Color
            </div>
            <Input
              type="color"
              name="color"
              className="p-0 border-none rounded-md"
              value={newBoardColor}
              onChange={(e) => setNewBoardColor(e.target.value)}
              defaultValue="#6338f0"
            />
            <div className="flex gap-4 mt-4">
              <Button
                variant="soft"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpen(setOpenBoardColor, openBoardColor);
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
      <div>
        <Command className="p-0">
          <CommandInput placeholder="Search boards..."></CommandInput>
          <CommandEmpty>No Item found</CommandEmpty>
          <CommandGroup className="max-h-48 overflow-y-auto no-scrollbar">
            {boards.map((item, index) => (
              <CommandItem
                onSelect={() => handleSelect(item)}
                key={`assigned-list-item-${index}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        board?.id === item.id ? 'opacity-100' : 'opacity-0',
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
            ))}
          </CommandGroup>
        </Command>
        <Button
          className="bg-muted text-sm font-medium text-default-600 px-4 py-1.5 border-b border-default-200 hover:bg-default-50 hover:underline hover:decoration-primary cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Stop the event from propagating to the outer div
            setNewBoardName('');
            setNewBoardColor('#2196F3');
            setOpenEdit('Create');
            toggleOpen(setOpenBoardColor, openBoardColor);
          }}
        >
          Create Board
        </Button>
      </div>
    );
  };

  if (!isNew) {
    return (
      <>
        <CustomPopover
          trigger={
            <Button
              type="button"
              onClick={() => toggleOpen(setOpen, open)}
              className="text-sm font-medium text-default-500  bg-transparent hover:bg-transparent"
            >
              <Badge
                className="capitalize"
                style={{
                  borderColor: isDark ? 'white' : 'black',
                  backgroundColor: board ? board.color : '#FFFFFF',
                  color: isDark ? 'white' : 'black',
                }}
              >
                {board ? board.name : 'No Board'}
              </Badge>
            </Button>
          }
          open={open}
          className={'left-[unset] right-0'}
          onClose={() => setOpen(false)}
        >
          {openBoardColor ? <FirstPart /> : <SecondPart />}
        </CustomPopover>

        <CreateBoard
          open={open2}
          onClose={() => closeCreateBoard()}
          board={null}
          boardId={null}
          task={task}
        />
        <DeleteConfirmationDialog
          question="Are you sure you want to delete this board?"
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
        <CustomPopover
          trigger={
            <Button
              type="button"
              onClick={() => toggleOpen(setOpen, open)}
              className="text-sm font-medium text-default-500  bg-transparent hover:bg-transparent"
            >
              <Badge
                className="capitalize"
                style={{
                  borderColor: 'white',
                  backgroundColor: board ? board.color : '#FFFFFF',
                  color: isDark ? 'white' : 'black',
                }}
              >
                {board ? board.name : 'No Board'}
              </Badge>
            </Button>
          }
          open={open}
          className={'left-[unset] right-0'}
          onClose={() => setOpen(false)}
        >
          {openBoardColor ? <FirstPart /> : <SecondPart />}
        </CustomPopover>

        <CreateBoard
          open={open2}
          onClose={closeCreateBoard}
          board={null}
          boardId={null}
          task={task}
          categoryId={categoryId}
        />
        <DeleteConfirmationDialog
          question="Are you sure you want to delete this board?"
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

export default AssignList;
