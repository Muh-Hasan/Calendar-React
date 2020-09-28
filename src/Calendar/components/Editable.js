import React, { useState, useContext } from "react";
import { EventsContext } from "../Context/Context";

export default function Editable({ value }) {
  const [id, setId] = useState(0);
  const [userEvent, setUserEvent] = useState("");
  const [userFrom, setUserFrom] = useState("");
  const [userTo, setUserTo] = useState("");
  const { events, addingEvents, remove } = useContext(EventsContext);
  function submit() {
    setId(id + 1);
    addingEvents({
      id: id,
      day: value.format("MM/DD/YY"),
      title: userEvent,
      from: userFrom,
      to: userTo,
    });
    setUserEvent("");
    setUserFrom("");
    setUserTo("");
  }

  return (
    <div className="left-side">
      <div className="current-day text-center">
        <h1 className="calendar-left-side-day">{value.format("DD")}</h1>
        <div className="calendar-left-side-day-of-week">{value.format("dddd")}</div>
      </div>
      <div className="current-day-events">
        {events.length <= 0 ? (
          <div className="no-event">
            <h6>No events for today</h6>
          </div>
        ) : (
          <>
            <div>Current Events:</div>
            <ul className="current-day-events-list">
              {events
                .filter((item) => item.day === value.format("MM/DD/YY"))
                .map((item , i) => (
                  <li key={i}>
                    {item.from} - {item.to} {item.title} <button className='btn-remove' onClick={() => remove(item.id)}>x</button>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
      <div className="add-event-day">
        <input
          type="number"
          className="add-event-day-field"
          placeholder="from"
          onChange={(e) => setUserFrom(e.currentTarget.value)}
          value={userFrom}
        />
        <input
          type="number"
          className="add-event-day-field"
          placeholder="to"
          onChange={(e) => setUserTo(e.currentTarget.value)}
          value={userTo}
        />
        <input
          type="text"
          className="add-event-day-field"
          placeholder="Create an Event"
          onChange={(e) => setUserEvent(e.currentTarget.value)}
          value={userEvent}
        />
        <span className="fa fa-plus-circle cursor-pointer add-event-day-field-btn" onClick={() => submit()}></span>
      </div>
    </div>
  );
}
