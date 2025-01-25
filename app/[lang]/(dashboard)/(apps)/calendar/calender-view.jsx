'use client';
import React, { useState, useEffect } from 'react';

import { Draggable } from '@fullcalendar/interaction';
import EventSheet from './event-sheet';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import ExternalDraggingEvent from './dragging-events';
import { Calendar } from 'components/ui/calendar';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import { Plus } from 'lucide-react';
import { Checkbox } from 'components/ui/checkbox';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const CalendarView = ({ events, boards }) => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedEventDate, setSelectedEventDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // event canvas state
  const [sheetOpen, setSheetOpen] = useState(false);
  const date = new Date();

  const [dragEvents] = useState([
    { title: 'New Event Planning', id: '101', tag: 'business' },
    { title: 'Meeting', id: '102', tag: 'meeting' },
    { title: 'Generating Reports', id: '103', tag: 'holiday' },
    { title: 'Create New theme', id: '104', tag: 'etc' },
  ]);

  useEffect(() => {
    setSelectedBoard(boards?.map((c) => c.value));
  }, [events, boards]);

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: '.fc-event',
          eventData: function (eventEl) {
            let title = eventEl.getAttribute('title');
            let id = eventEl.getAttribute('data');
            let event = dragEvents.find((e) => e.id === id);
            let tag = event ? event.tag : '';
            return {
              title: title,
              id: id,
              calendar: {
                tag,
              },
            };
          },
        });
      }
    };

    if (dragEvents.length > 0) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener('mousedown', initDraggable);
    };
  }, [dragEvents]);
  // handle close modal
  const handleCloseModal = () => {
    setSheetOpen(false);
    setSelectedEvent(null);
    setSelectedEventDate(null);
  };
  const handleDateClick = (arg) => {
    setSheetOpen(true);
    setSelectedEventDate(arg);
    setSelectedEvent(null);
    wait().then(() => (document.body.style.pointerEvents = 'auto'));
  };

  const handleBoardSelection = (board) => {
    if (selectedBoard.includes(board)) {
      setSelectedBoard(selectedBoard.filter((c) => c !== board));
    } else {
      setSelectedBoard([...selectedBoard, board]);
    }
  };

  return (
    <div>
      <div className=" grid grid-cols-12 gap-6 divide-x  divide-border">
        <Card className="col-span-12 lg:col-span-4 2xl:col-span-3  pb-5">
          <CardContent className="p-0 ">
            <CardHeader className="border-none mb-2 pt-5">
              <Button onClick={handleDateClick}>
                <Plus className="w-4 h-4 text-primary-foreground ltr:mr-1 rtl:ml-1" />
                Add Event
              </Button>
            </CardHeader>
            <div className="px-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(s) => {
                  handleDateClick(s);
                }}
                className="rounded-md border w-full p-0 border-none"
              />
            </div>

            <div id="external-events" className=" space-y-1.5 mt-6 px-4">
              <p className=" text-sm font-medium text-default-700 pb-2">
                Drag and drop your event or click in the calendar
              </p>
              {dragEvents.map((event) => (
                <ExternalDraggingEvent key={event.id} event={event} />
              ))}
            </div>
            <div className="py-4 text-default-800  font-semibold text-xs uppercase mt-4 px-4">
              FILTER
            </div>
            <ul id="x" className=" space-y-2 px-4">
              <li id="all" className=" flex gap-3">
                <Checkbox
                  checked={selectedBoard?.length === boards?.length}
                  onClick={() => {
                    if (selectedBoard?.length === boards?.length) {
                      setSelectedBoard([]);
                    } else {
                      setSelectedBoard(boards.map((c) => c.value));
                    }
                  }}
                />
                <Label>All</Label>
              </li>
              {boards?.map((board) => (
                <li id={board.id} className=" flex gap-3 " key={board.value}>
                  <Checkbox
                    className={board.className}
                    id={board.label}
                    checked={selectedBoard?.includes(board.value)}
                    onClick={() => handleBoardSelection(board.value)}
                  />
                  <Label htmlFor={board.label}>{board.title}</Label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5">
          <CardContent className="hasten-calendar"></CardContent>
        </Card>
      </div>
      <EventSheet
        open={sheetOpen}
        onClose={handleCloseModal}
        boards={boards}
        event={selectedEvent}
        selectedDate={selectedEventDate}
      />
    </div>
  );
};

export default CalendarView;
