function CalendarGrid({ currentDate, openOverlayFromCell }) {

  const weekDays = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startIndex = firstDay === 0 ? 6 : firstDay - 1;

  const cells = [];

  for (let i = 0; i < startIndex; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <div className="calendar-container">

      <div className="week-days">
        {weekDays.map((day) => (
          <h4 key={day}>{day}</h4>
        ))}
      </div>

      <div className="calendar">
        {cells.map((day, index) => {

          if (!day) {
            return <div key={index} className="day"></div>;
          }

          const monthStr = String(month + 1).padStart(2, "0");
          const dayStr = String(day).padStart(2, "0");
          const dateStr = `${year}-${monthStr}-${dayStr}`;

          return (
            <div
              key={index}
              className="day"
              data-date={dateStr}
              onClick={() => openOverlayFromCell(dateStr)}
            >
              {day}
              <ul></ul>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default CalendarGrid;