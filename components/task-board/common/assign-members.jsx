'use client';
import { Button } from 'components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from 'components/ui/command';
import { CustomPopover } from 'components/ui/popover';
import { UserPlus, X } from 'lucide-react';
import { useState } from 'react';

const AssignMembers = ({ icon }) => {
  const [open, setOpen] = useState(false);
  const togglePopover = () => setOpen(!open);

  return (
    <CustomPopover
      trigger={
        <button
          className="h-5 w-5 rounded-full bg-default-100 grid place-content-center"
          onClick={togglePopover}
        >
          {icon ? icon : <UserPlus className="w-3 h-3 text-primary" />}
        </button>
      }
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="flex justify-between items-center bg-default-50  border-b border-default-300 px-3 py-2">
        <div className=" text-sm font-medium text-default-900 ">
          Assign Task To
        </div>
        <Button
          type="button"
          size="icon"
          className="w-6 h-6 bg-default-400 rounded-full"
          onClick={togglePopover}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-2">
        <Command>
          <CommandInput
            placeholder="Search By Name..."
            inputWrapper="border border-default-200 rounded-md"
            className="h-9"
          ></CommandInput>
          <CommandEmpty>No new members.</CommandEmpty>
          <CommandGroup></CommandGroup>
        </Command>
      </div>
    </CustomPopover>
  );
};

export default AssignMembers;
