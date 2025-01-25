"use client";
import { Button } from "components/ui/button";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Card, CardContent } from "components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog";


const TaskDate = ({ allTasks, task }) => {
  const [open, setOpen] = useState(false);
  const togglePopover = () => setOpen(!open);

  const handleClassName = (arg) => {
    const classname = `bg-[${arg.event.extendedProps.color}]`
    return [classname, "primary"];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-transparent hover:bg-transparent text-start p-0"
          onClick={togglePopover}
        >
          <span className="text-sm font-medium text-default-500  whitespace-normal">
            Due: {dayjs(task.end).format('DD MMM, YYYY / h:mma')}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent size="2xl">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            Select Date
          </DialogTitle>
        </DialogHeader>
        <div>
          <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5">
            <CardContent className="hasten-calendar">
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={allTasks}
                editable={true}
                rerenderDelay={10}
                eventDurationEditable={false}
                selectable={true}
                selectMirror={true}
                droppable={true}
                dayMaxEvents={2}
                weekends={true}
                nowIndicator={true}
                eventClassNames={handleClassName}
                initialView="dayGridMonth"
              />
            </CardContent>
          </Card>
          <div className=" flex justify-center gap-3 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button">Confirm </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDate;
