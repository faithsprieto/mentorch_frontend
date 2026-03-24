import { PlusCircleFilled } from "@ant-design/icons";

function CalendarReminder({ openOverlayFromButton }) {
  return (
    <div className="whole-reminder">
      <div className="reminders">
        <a
          href="#"
          className="footer-link"
          onClick={(e) => {
            e.preventDefault();      // stops page navigation
            openOverlayFromButton(); // opens overlay
          }}
        >
          <PlusCircleFilled className="footer-icon" />
          <p>Reminders</p>
        </a>

        <ul className="add-reminder"></ul>

      </div>
    </div>
  );
}

export default CalendarReminder;