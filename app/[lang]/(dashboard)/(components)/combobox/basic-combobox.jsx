'use client';
import * as React from 'react';
import { Command, CommandEmpty, CommandInput } from 'components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

const BasicCombobox = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild></PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BasicCombobox;
