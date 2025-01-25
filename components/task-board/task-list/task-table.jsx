"use client";
import * as React from "react";
import { cn } from "lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { ChevronDown, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover";
import { Button } from "components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "components/ui/badge";
import { Input } from "components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "components/ui/dialog";
import { Label } from "components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Calendar } from "components/ui/calendar";
import {
  deleteTask,
  updateTask,
  createTask,
} from "config/category-config";
import DeleteConfirmationDialog from "components/delete-confirmation-dialog";

const tabs = [
  {
    label: "Due Date",
    value: "due-date",
  },
  {
    label: "Start Date",
    value: "start-date",
  },
];

const priorityColors = {
  high: "success",
  medium: "warning",
  low: "destructive",
};

const schema = z.object({
  title: z.string().min(2, { message: "Need Task Title" }),
});

const TaskTable = ({ data, boards, onUpdateTask, boardID2 }) => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dueDate, setDueDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const [, startTransition] = React.useTransition();
  const getBoardNameById = (boardId) => {
    const foundBoard = boards.find((board) => board.id === boardId);
    return foundBoard ? foundBoard.name : "Unknown Board";
  };
  const handleMoveTask = (task, boardId) => {
    const newData = {
      ...task,
      boardId: boardId,
    };
    updateTask(task.id, newData).catch(error => console.log(error));
  };

  const onAction = (dltId) => {
    deleteTask(dltId).catch(error => console.log(error));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    data.boardId = boardID2;
    startTransition(() => {
      createTask(data)
        .then(() => toast.success("Successfully added"))
        .catch(error => console.log(error));
    });

    reset();
  };

  const columns = [
    {
      id: "id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="rtl:mr-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="rtl:mr-4"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <div
          className="flex items-center gap-2 max-w-[300px] text-ellipsis cursor-pointer"
          onClick={() => onUpdateTask(row?.original)}
        >
          <div className="flex-1 text-sm font-medium text-default-800 capitalize truncate">
            {row.getValue("title")} {boardID2}
          </div>
          <div className="text-[10px] font-semibold bg-default-100 text-default-600 px-2 rounded-sm">
            {row.original?.tag}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="soft"
                className="flex items-center gap-1 text-sm font-medium  h-6 whitespace-nowrap"
              >
                {getBoardNameById(row?.original.boardId)}{" "}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[50px]" align="start">
              {boards?.map((board) => (
                <DropdownMenuItem
                  onSelect={() => handleMoveTask(row.original, board.id)}
                  className="text-[10px] leading-[14px] font-semibold  text-default-600 py-1"
                  key={`key-dropdown-${board.id}`}
                >
                  {board.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },

    {
      accessorKey: "list",
      header: "List",
      cell: ({ row }) => (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="soft"
                className="flex items-center gap-1 text-sm font-medium  h-6 whitespace-nowrap"
              >
                UI/UX Design <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="flex justify-between items-center bg-default-50  border-b border-default-300 px-3 py-2 ">
                <div className=" text-sm font-medium text-default-900 ">
                  Task List{" "}
                </div>
                <PopoverClose>
                  <Button
                    type="button"
                    size="icon"
                    className="w-6 h-6 bg-default-400 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </PopoverClose>
              </div>
              <Command>
                <div className="p-2">
                  <CommandInput
                    placeholder="Search list..."
                    inputWrapper="border border-default-200 rounded-md"
                    className="h-9"
                  ></CommandInput>
                </div>
                <CommandEmpty>No Item found</CommandEmpty>
                <CommandGroup>
                  {row.getValue("list")?.map((item, index) => (
                    <CommandItem key={`assigned-list-item-${index}`}>
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="text-sm font-medium text-default-600 px-4 py-1.5 border-b border-default-200 hover:bg-default-50 hover:underline hover:decoration-primary cursor-pointer">
                    Create a list
                  </div>
                </DialogTrigger>
                <DialogContent size="lg" className="px-0">
                  <DialogHeader className="border-b border-default-300">
                    <div className="text-lg font-medium text-default-900 text-center pb-4">
                      Create a list
                    </div>
                  </DialogHeader>

                  <div className="p-4">
                    <Label htmlFor="listname" className="mb-2">
                      List Name
                    </Label>
                    <Input type="text" placeholder="example list.." />
                  </div>
                  <DialogFooter className=" px-4 sm:justify-center">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Due Date",
      cell: ({ row }) => (
        <div>
          <Popover>
            <PopoverTrigger>
              <Button
                type="button"
                className="font-medium text-default-600 bg-transparent hover:bg-transparent whitespace-nowrap"
              >
                {row.getValue("date")} /{row?.original?.time}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom">
              <Tabs defaultValue="due-date" className="block">
                <TabsList className="grid w-full grid-cols-2 h-12 py-2">
                  {tabs.map((item) => (
                    <TabsTrigger
                      key={`date-item-${item.value}`}
                      value={item.value}
                    >
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="due-date">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    className=" w-full"
                  />
                </TabsContent>
                <TabsContent value="start-date">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className=" w-full"
                  />
                </TabsContent>
              </Tabs>
              <div className="p-2.5 flex justify-end gap-2">
                <PopoverClose>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </PopoverClose>
                <Button size="sm">Select</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <div>
          {row.getValue("priority") ? (
            <Badge
              color={priorityColors[row.getValue("priority")] || ""}
              className="capitalize"
            >
              {row.getValue("priority")}
            </Badge>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="soft"
                  className="text-sm font-medium text-primary h-6 bg-transparent hover:bg-transparent hover:text-primary"
                >
                  Add...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[196px]" align="start">
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>urgent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ),
    },
    {
      accessorKey: "storyPoints",
      header: "Story Point",
      cell: ({ row }) => (
        <div>
          {row.getValue("storyPoints") ? (
            row.getValue("storyPoints")
          ) : (
            <input
              type="text"
              placeholder="Set"
              className="border-b border-default-200 focus:outline-none w-16"
            />
          )}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <>
            <DeleteConfirmationDialog
              question="Are you sure you want to delete this task?"
              paragraph="This action cannot be undone."
              open={open}
              onClose={() => setOpen(false)}
              onConfirm={() => onAction(row.original.id)}
            />
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7"
                color="secondary"
                onClick={() => setOpen(true)}
              >
                <Icon icon="heroicons:trash" className=" h-4 w-4  " />
              </Button>
              <Button
                size="icon"
                variant="outline"
                color="secondary"
                className=" h-7 w-7 "
                onClick={() => onUpdateTask(row?.original)}
              >
                <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
              </Button>
            </div>
          </>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="border border-default-300 rounded-bl-xl overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-r border-default-300 first:border-r-0  whitespace-nowrap rtl:text-right"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`row-${row.id}`}
                  data-state={row.getIsSelected() && "selected"}
                  className="border border-default-300 "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={`cell-${cell.id}`}
                      className="border-r border-default-300 first:border-r-0 py-2.5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell
                className="border-r border-default-300 first:border-r-0 py-2.5"
                colSpan={columns.length / 2}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 text-primary" />
                    <input
                      type="text"
                      {...register("title")}
                      placeholder={
                        errors.title ? errors.title.message : "Add a task"
                      }
                      className={cn(
                        "text-sm font-medium text-default-900 focus:outline-none pl-2 placeholder:text-primary",
                        {
                          " placeholder:text-destructive  text-destructive ":
                          errors.title,
                        }
                      )}
                    />
                  </div>
                </form>
              </TableCell>
              <TableCell
                className="border-r border-default-300 first:border-r-0 py-2.5"
                colSpan={columns.length / 2}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TaskTable;
