'use client';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Plus } from 'lucide-react';
import Priority from './priority';
import { usePathname } from 'next/navigation';
import { useUser } from 'provider/userProvider';
import React, { startTransition } from 'react';
import {
  createUserPriority,
  deletePriority,
  updatePriority,
} from 'config/category-config';
import { Input } from 'components/ui/input';
import { toast } from '../../../../../components/ui/use-toast';
const priorities = ({ priorities }) => {
  const location = usePathname();
  const { user } = useUser();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [newName, setNewName] = React.useState('');
  const [newColor, setNewColor] = React.useState('#2196F3');

  const handleDelete = (id) => {
    startTransition(async () => {
      try {
        await deletePriority(id, location);
      } catch (error) {
        toast.error('Something Went Wrong');
        console.log(error);
      }
    });
  };
  const handleCreate = () => {
    const newPriority = {
      name: newName,
      color: newColor,
    };
    startTransition(async () => {
      try {
        await createUserPriority(newPriority, user.id, location);
        setOpenCreate();
        setNewName('');
        setNewColor('#2196F3');
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleEdit = () => {
    const newPriority = {
      name: newName,
      color: newColor,
    };
    startTransition(async () => {
      try {
        await updatePriority(editId, newPriority, location);
        setOpenEdit(false);
        setEditId(0);
        setNewName('');
        setNewColor('#2196F3');
      } catch (error) {
        console.log(error);
      }
    });
  };
  const handleSubmit = () => {
    if (openCreate) {
      handleCreate();
    }
    if (openEdit) {
      handleEdit();
    }
    setOpenCreate(false);
    setOpenEdit(false);
  };
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center border-none mb-2">
        <CardTitle className="flex-1"> Priorities </CardTitle>
        <Button
          size="icon"
          className="flex-none bg-default-100 dark:bg-default-50 text-default-500 hover:bg-default-100 rounded h-6 w-6 -mt-1"
          onClick={() => setOpenCreate(true)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {openEdit || openCreate ? (
          <div>
            <div className="p-2">
              <form onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="text"
                    placeholder="type a name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="text-sm font-medium text-default-700 my-2">
                  Select Color
                </div>
                <Input
                  type="color"
                  name="color"
                  className="p-0 border-none rounded-md"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                />
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="soft"
                    type="button"
                    onClick={() => {
                      setOpenEdit(false);
                      setOpenCreate(false);
                      setNewName('');
                      setNewColor('#2196F3');
                      setEditId('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button>Save</Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 items-center">
            {priorities?.map((priority) => (
              <Priority
                key={`Priority-${priority.id}`}
                priority={priority}
                handleDelete={handleDelete}
                setOpenEdit={setOpenEdit}
                setEditId={setEditId}
                setNewName={setNewName}
                setNewColor={setNewColor}
              ></Priority>
            ))}
          </div>
        )}
        ;
      </CardContent>
    </Card>
  );
};

export default priorities;
