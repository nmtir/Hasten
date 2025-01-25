'use client';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Check, Plus, X } from 'lucide-react';
import Tag from './tag';
import React, { startTransition } from 'react';
import { Input } from 'components/ui/input';
import { addTaskTag, deleteTag, editTag } from 'config/category-config';
import { useUser } from 'provider/userProvider';
import { usePathname } from 'next/navigation';

const Tags = ({ tags }) => {
  const location = usePathname();
  const { user } = useUser();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [newName, setNewName] = React.useState('');
  const [newColor, setNewColor] = React.useState('#2196F3');

  const handleSubmission = () => {
    console.log('handleSubmission', editId);
  };
  const handleDelete = (id) => {
    startTransition(async () => {
      try {
        await deleteTag(id, location);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const handleCreate = () => {
    const newTag = {
      name: newName,
      color: newColor,
    };
    startTransition(async () => {
      try {
        await addTaskTag(newTag, user.id, location);
        setOpenCreate();
        setNewName('');
        setNewColor('#2196F3');
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleEdit = () => {
    const newTag = {
      name: newName,
      color: newColor,
    };
    startTransition(async () => {
      try {
        await editTag(newTag, editId, location);
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
        <CardTitle className="flex-1"> Tags </CardTitle>
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
            {tags?.map((tag) => (
              <Tag
                key={`Tag-${tag.id}`}
                tag={tag}
                handleDelete={handleDelete}
                setOpenEdit={setOpenEdit}
                setEditId={setEditId}
                setNewName={setNewName}
                setNewColor={setNewColor}
              ></Tag>
            ))}
          </div>
        )}
        ;
      </CardContent>
    </Card>
  );
};

export default Tags;
