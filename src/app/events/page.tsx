"use client";
import { formatJoinDate } from "@/utils/FormatDate";
import React, { useState, useEffect } from "react";
import {
  MdEvent,
  MdAdd,
  MdDelete,
  MdEdit,
  MdClose,
  MdPublic,
  MdLock,
  MdSchool,
} from "react-icons/md";
// Types
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  visibility: "public" | "private" | "faculty";
  createdBy: "user" | "faculty";
}

// Event Creation Modal Component
const EventModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, "id">) => void;
  editEvent?: Event;
}> = ({ isOpen, onClose, onSave, editEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    visibility: "public" as Event["visibility"],
    createdBy: "user" as Event["createdBy"],
  });

  useEffect(() => {
    if (editEvent) {
      setFormData({
        title: editEvent.title,
        description: editEvent.description,
        date: editEvent.date.toISOString().split("T")[0],
        time: editEvent.time,
        visibility: editEvent.visibility,
        createdBy: editEvent.createdBy,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        time: "09:00",
        visibility: "public",
        createdBy: "user",
      });
    }
  }, [editEvent, isOpen]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      date: new Date(formData.date),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editEvent ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MdClose className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter event title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={3}
              placeholder="Event description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Visibility
            </label>
            <select
              value={formData.visibility}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visibility: e.target.value as Event["visibility"],
                })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="public">Public - Everyone can see</option>
              <option value="private">Private - Only you can see</option>
              <option value="faculty">
                Faculty Only - Faculty members only
              </option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 
                         rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 active:scale-95 transition-all"
            >
              {editEvent ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Calendar Component
const Calendar: React.FC<{
  events: Event[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}> = ({ events, selectedDate, onDateSelect }) => {
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    onDateSelect(newDate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-gray-600 dark:text-gray-400">←</span>
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-gray-600 dark:text-gray-400">→</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isToday = date.toDateString() === today.toDateString();
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const dayEvents = getEventsForDate(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={`
                relative p-2 h-20 text-left border border-gray-200 dark:border-gray-700 
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-all
                ${
                  isCurrentMonth
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                }
                ${isSelected ? "ring-2 ring-blue-500" : ""}
                ${isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              `}
            >
              <span
                className={`
                text-sm font-medium
                ${
                  isCurrentMonth
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600"
                }
                ${isToday ? "text-blue-600 dark:text-blue-400 font-bold" : ""}
              `}
              >
                {date.getDate()}
              </span>

              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((event, i) => (
                  <div
                    key={i}
                    className={`
                      text-xs px-1 py-0.5 rounded truncate
                      ${
                        event.visibility === "public"
                          ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
                          : ""
                      }
                      ${
                        event.visibility === "private"
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                          : ""
                      }
                      ${
                        event.visibility === "faculty"
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200"
                          : ""
                      }
                    `}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Main Events Page Component
const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync",
      date: new Date(2024, 11, 25),
      time: "10:00",
      visibility: "private",
      createdBy: "user",
    },
    {
      id: "2",
      title: "Campus Workshop",
      description: "AI and Machine Learning workshop",
      date: new Date(2024, 11, 28),
      time: "14:00",
      visibility: "public",
      createdBy: "faculty",
    },
    {
      id: "3",
      title: "Faculty Meeting",
      description: "Monthly faculty discussion",
      date: new Date(2024, 11, 30),
      time: "16:00",
      visibility: "faculty",
      createdBy: "faculty",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();

  const handleCreateEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
  };

  const handleEditEvent = (eventData: Omit<Event, "id">) => {
    if (!editingEvent) return;

    setEvents(
      events.map((event) =>
        event.id === editingEvent.id
          ? { ...eventData, id: editingEvent.id }
          : event
      )
    );
    setEditingEvent(undefined);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const selectedDateEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  const getVisibilityIcon = (visibility: Event["visibility"]) => {
    switch (visibility) {
      case "public":
        return <MdPublic className="w-4 h-4" />;
      case "private":
        return <MdLock className="w-4 h-4" />;
      case "faculty":
        return <MdSchool className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <MdEvent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Events
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Calendar
              events={events}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* Events for Selected Date */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Events for{" "}
                {selectedDate.getDate() + " " + formatJoinDate(selectedDate)}
              </h3>

              {selectedDateEvents.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No events scheduled for this date
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getVisibilityIcon(event.visibility)}
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {event.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {event.time}
                          </p>
                          {event.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {event.description}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => {
                              setEditingEvent(event);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                                         hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-all"
                          >
                            <MdEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 
                                         hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                          >
                            <MdDelete className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Event Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Event Statistics
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdPublic className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Public Events
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {events.filter((e) => e.visibility === "public").length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdLock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Private Events
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {events.filter((e) => e.visibility === "private").length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdSchool className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Faculty Only
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {events.filter((e) => e.visibility === "faculty").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => {
            setEditingEvent(undefined);
            setIsModalOpen(true);
          }}
          className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-full shadow-2xl hover:shadow-3xl 
                       transition-all hover:scale-110 active:scale-95 z-40
                       flex items-center justify-center"
        >
          <MdAdd className="w-8 h-8" />
        </button>

        {/* Event Modal */}
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(undefined);
          }}
          onSave={editingEvent ? handleEditEvent : handleCreateEvent}
          editEvent={editingEvent}
        />
      </div>
    </div>
  );
};

export default EventsPage;
