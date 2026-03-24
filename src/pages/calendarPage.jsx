import { useState, useEffect } from "react";
import CalendarHeader from "../components/calendar/calendarHeader";
import CalendarGrid from "../components/calendar/calendarGrid";
import CalendarReminderOverlay from "../components/calendar/calendarReminderOverlay";
import CalendarOverlay from "../components/calendar/calendarReminder";

import { getRequest, postRequest, deleteRequest } from "../utils/api";

import "../styles/pagestyles/calendarPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // store FULL reminder objects now (not just text)
  const [reminders, setReminders] = useState({});

  // ============================
  // LOAD REMINDERS FROM BACKEND
  // ============================
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        // adjust endpoint based on your backend route
        const data = await getRequest("/calendar/reminders/1");

        const formatted = {};

        data.forEach((reminder) => {
          const date = reminder.date_time.split(" ")[0]; // YYYY-MM-DD

          if (!formatted[date]) {
            formatted[date] = [];
          }

          formatted[date].push(reminder);
        });

        setReminders(formatted);
      } catch (err) {
        console.error("Failed to load reminders", err);
      }
    };

    fetchReminders();
  }, []);

  // ============================
  // MONTH NAVIGATION
  // ============================
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // ============================
  // OVERLAY HANDLING
  // ============================
  const openOverlayFromButton = () => {
    setSelectedDate(null);
    setShowOverlay(true);
  };

  const openOverlayFromCell = (date) => {
    setSelectedDate(date);
    setShowOverlay(true);
  };

  // ============================
  // ADD REMINDER (API + UI)
  // ============================
  const addReminder = async (date, text) => {
    try {
      const newReminder = await postRequest("/calendar/create", {
        student_id: 1,
        title: text,
        date_time: date,
      });

      setReminders((prev) => {
        const updated = { ...prev };

        if (!updated[date]) {
          updated[date] = [];
        }

        updated[date].push(newReminder);

        return updated;
      });

      setShowOverlay(false);
    } catch (err) {
      console.error("Failed to add reminder", err);
    }
  };

  // ============================
  // DELETE REMINDER
  // ============================
  const deleteReminder = async (date, id) => {
    try {
      await deleteRequest(`/calendar/delete/${id}`);

      setReminders((prev) => {
        const updated = { ...prev };

        updated[date] = updated[date].filter(
          (reminder) => reminder.calendar_id !== id
        );

        if (updated[date].length === 0) {
          delete updated[date];
        }

        return updated;
      });
    } catch (err) {
      console.error("Failed to delete reminder", err);
    }
  };

  return (
    <div className="calendar-page">
      <CalendarHeader
        currentDate={currentDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      <div className="main-content">
        <CalendarGrid
          currentDate={currentDate}
          openOverlayFromCell={openOverlayFromCell}
          reminders={reminders}
        />

        <CalendarOverlay openOverlayFromButton={openOverlayFromButton} />
      </div>

      {showOverlay && (
        <CalendarReminderOverlay
          selectedDate={selectedDate}
          closeOverlay={() => setShowOverlay(false)}
          addReminder={addReminder}
          reminders={reminders[selectedDate] || []}
          deleteReminder={deleteReminder}
        />
      )}
    </div>
  );
}