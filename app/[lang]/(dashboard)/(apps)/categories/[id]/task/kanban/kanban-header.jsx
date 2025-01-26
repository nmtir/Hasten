'use client';
import { formatDateTime } from 'components/common/common';
import { Input } from 'components/ui/input';
import { Check, Plus, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
  SelectGroup,
} from 'components/ui/select';
import { Icon } from '@iconify/react';
import { Button } from 'components/ui/button';
import React, { useState } from 'react';
import {
  CommandGroup,
  CommandItem,
  Command,
  CommandSeparator,
} from 'components/ui/command';
import { cn } from 'lib/utils';
import { CustomPopover } from '../../../../../../../../components/ui/popover';
import FilterDateSelector from './filter-date-selector';
const KanbanHeader = ({
  selectedEndDate,
  setSelectedEndDate,
  selectedStartDate,
  setSelectedStartDate,
  selectedTags,
  setSelectedTags,
  selectedPriorities,
  setSelectedPriorities,
  priorities,
  tags,
  openCreateBoard,
}) => {
  const [openFilters, setOpenFilters] = useState(false);

  const [dateSelector, setDateSelector] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(null);
  const toggleSelection = (value, selected, setSelected) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const renderSelectedValues = () => {
    const selectedLabels = [
      ...selectedPriorities,
      ...selectedTags.map((tag) => `Tag-${tag}`),
      selectedStartDate ? `Start: ${selectedStartDate.toLocaleString()}` : null,
      selectedEndDate ? `End: ${selectedEndDate.toLocaleString()}` : null,
    ].filter(Boolean); // Remove null values
    return selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Filters';
  };

  const handleFiltersPopover = () => {
    setOpenFilters(!openFilters);
  };
  const closeFilters = () => {
    setOpenFilters(false);
  };

  const handleDateSelection = (date) => {
    if (dateSelector === 'start') {
      setSelectedStartDate(date);
    } else if (dateSelector === 'end') {
      setSelectedEndDate(date);
    }
    setDateSelector(null); // Close the date picker
  };

  return (
    <div className=" flex items-center flex-wrap gap-4">
      <div className="flex-1 flex items-center  gap-4">
        <div className="relative min-w-[240px]">
          <span className="absolute top-1/2 -translate-y-1/2 ltr:left-2 rtl:right-2">
            <Search className="w-4 h-4 text-default-500" />
          </span>
          <Input
            type="text"
            placeholder="Search Keywords"
            className="ltr:pl-7 rtl:pr-7"
            size="lg"
          />
        </div>
        {/* filter task */}
        <div className="relative">
          <CustomPopover
            trigger={
              <div className="flex items-center gap-1 rounded-lg border bg-popover text-popover-foreground">
                <div
                  className={'flex  flex-row justify-between '}
                  onClick={handleFiltersPopover}
                >
                  <div className="p-2.5 text-default-500">Filters</div>
                  <div className="grid place-items-center  ">
                    <Icon
                      icon="mynaui:chevron-down"
                      className="h-5 w-5 mr-2 ml-2"
                    />
                  </div>
                </div>
              </div>
            }
            open={openFilters}
            onClose={closeFilters}
          >
            <Command className="p-0">
              <CommandGroup
                heading="Tags"
                className="max-h-48 overflow-y-auto no-scrollbar"
              >
                {tags.map((tag) => {
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={() =>
                        toggleSelection(tag, selectedTags, setSelectedTags)
                      }
                      className="mb-1"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedTags?.some(
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
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup
                heading="Priorities"
                className="max-h-48 overflow-y-auto no-scrollbar"
              >
                {priorities.map((priority) => {
                  return (
                    <CommandItem
                      key={priority.id}
                      value={priority.name}
                      onSelect={() =>
                        toggleSelection(
                          priority,
                          selectedPriorities,
                          setSelectedPriorities,
                        )
                      }
                      className="mb-1"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedPriorities?.some(
                                (selectedPriority) =>
                                  selectedPriority.id === priority.id,
                              )
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          <div>{priority.name}</div>
                        </div>

                        <div className="flex items-center">
                          <div
                            style={{
                              backgroundColor: priority.color,
                              width: '12px',
                              height: '12px',
                              borderRadius: '4px',
                              marginLeft: '8px',
                            }}
                          />
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup
                heading="Date"
                className="max-h-48 overflow-y-auto no-scrollbar"
              >
                <CommandItem
                  key="start"
                  value="start"
                  className="mb-1"
                  onSelect={() => {
                    if (selectedStartDate || selectedEndDate) {
                      setSelectedStartDate(null);
                      setSelectedEndDate(null);
                    } else {
                      setIsDatePickerOpen(true);
                    }
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    {!selectedStartDate && !selectedEndDate && (
                      <div className="flex items-center">
                        <div>Date Range</div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <div>
                        {selectedStartDate
                          ? formatDateTime(selectedStartDate)
                          : ''}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        {selectedStartDate
                          ? formatDateTime(selectedEndDate)
                          : ''}
                      </div>
                    </div>
                  </div>
                </CommandItem>
              </CommandGroup>
            </Command>
          </CustomPopover>
        </div>
      </div>
      <div className="flex-none flex items-center gap-4">
        <Button onClick={openCreateBoard}>
          <Icon icon="line-md:plus" className="w-4 h-4 ltr:mr-1 rtl:ml-1" />{' '}
          Create Board
        </Button>
      </div>
      <FilterDateSelector
        open={isDatePickerOpen}
        setOpen={setIsDatePickerOpen}
        setStart={setSelectedStartDate}
        setEnd={setSelectedEndDate}
      ></FilterDateSelector>
    </div>
  );
};

export default KanbanHeader;
