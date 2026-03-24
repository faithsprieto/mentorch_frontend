import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

function CalendarHeader({ currentDate, prevMonth, nextMonth }) {

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="header-row">
      <div className="month-container">

        <button onClick={prevMonth}>
          <CaretLeftOutlined />
        </button>

        <div className="month-title-wrapper">
          <h2>{month}</h2>
        </div>

        <button onClick={nextMonth}>
          <CaretRightOutlined />
        </button>

      </div>

      <h2>{year}</h2>
    </div>
  );
}

export default CalendarHeader;