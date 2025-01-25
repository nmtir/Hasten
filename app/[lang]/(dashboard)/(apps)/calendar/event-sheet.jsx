import React, { useState, useEffect } from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { cn, formatDate } from "lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Calendar } from "components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CalendarIcon } from "lucide-react";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "config/calendar.config";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "components/delete-confirmation-dialog";
import { ScrollArea } from "components/ui/scroll-area";

const schema = z.object({
  title: z.string().min(3, { message: "Required" }),
});

const EventSheet = ({ open, onClose, boards, event, selectedDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPending, startTransition] = React.useTransition();
  const [calendarProps, setCalendarProps] = React.useState(boards[0].value);
  // delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  const {
    register,
    control,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data) => {
    startTransition(() => {
      // if event is  null only create event

      if (!event) {
        data.start = startDate;
        data.end = endDate;
        data.allDay = false;
        data.calendar = {
          calendarProps,
        };

        createEvent(data).then(r => {
          toast.success(r.message);
          reset();
          onClose();
        }).catch(error => toast.error(error.message));
      }
      // if event is not null only update event
      if (event) {
        updateEvent(event?.event?.id, data)
          .then(r => {
            toast.success(r.message);
            reset();
            onClose();
          })
          .catch(error => toast.error(error?.message));
      }
    });
  };
  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate.date);
      setEndDate(selectedDate.date);
    }
    if (event) {
      setStartDate(event?.event?.start);
      setEndDate(event?.event?.end);
      const eventCalendar = event?.event?.calendar;
      if (eventCalendar) {
        setCalendarProps(eventCalendar);
      } else {
        setCalendarProps(boards[0].value);
      }
    }
    setValue("title", event?.event?.title || "");
  }, [event, selectedDate, open]);

  const onDeleteEventAction = () => {
    if (!eventIdToDelete) {
      toast.error("Event ID not found");
      return;
    }

    deleteEvent(eventIdToDelete)
      .then(r => {
        toast.success(r.message);
        reset();
        onClose();
      }).catch(error => {
      toast.error(error.message);
      reset();
      onClose();
    });
  };

  const handleOpenDeleteModal = (eventId) => {
    setEventIdToDelete(eventId);
    setDeleteModalOpen(true);
    onClose();
  };

  return (
    <>
      <DeleteConfirmationDialog
        question="Are you sure you want to delete this event?"
        paragraph="This action cannot be undone."
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDeleteEventAction}
        defaultToast={false}
      />
      <Sheet open={open}>
        <SheetContent
          onPointerDownOutside={onClose}
          onClose={onClose}
          className="px-0"
        >
          <SheetHeader className="px-6">
            <SheetTitle>
              {event ? "Edit Event" : "Create Event"} {event?.title}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 h-full">
            <form className=" h-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="h-[calc(100vh-130px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pb-5 px-6">
                    <div className=" space-y-1.5">
                      <Label htmlFor="title">Event Name</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Enter Event Name"
                        {...register("title")}
                      />
                      {errors && (
                        <div className=" text-destructive">
                          {errors?.title?.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="startDate" className="mb-1.5">
                        Start Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between text-left font-normal border-default-200 text-default-600",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            {startDate ? (
                              formatDate(startDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="h-4 w-4 " />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Controller
                            name="startDate"
                            control={control}
                            render={() => (
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                              />
                            )}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="mb-1.5">
                        End Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between text-left font-normal border-default-200 text-default-600",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            {endDate ? (
                              formatDate(endDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className=" h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Controller
                            name="endDate"
                            control={control}
                            render={() => (
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                              />
                            )}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="calendarProps" className="mb-1.5">
                        Label
                      </Label>
                      <Controller
                        name="calendarProps"
                        control={control}
                        render={() => (
                          <Select
                            value={calendarProps}
                            onValueChange={(data) => setCalendarProps(data)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Label" />
                            </SelectTrigger>
                            <SelectContent>
                              {boards.map((board) => (
                                <SelectItem
                                  value={board.value}
                                  key={board.value}
                                >
                                  {board.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </ScrollArea>
              </div>
              <div className="pb-12 flex flex-wrap gap-2 px-6">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {event ? "Updating..." : "Adding..."}
                    </>
                  ) : event ? (
                    "Update Event"
                  ) : (
                    "Add Event"
                  )}
                </Button>
                {event && (
                  <Button
                    type="button"
                    color="destructive"
                    onClick={() => handleOpenDeleteModal(event?.event?.id)}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EventSheet;
