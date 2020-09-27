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
    <div className="edit-box">
      <div>
        <h1>{value.format("DD")}</h1>
        <h3>{value.format("dddd")}</h3>
      </div>
      <div>
        <div>
          <h4>Current Events:</h4>
        </div>
        <div>
          {events.length <= 0 ? (
            <h6>No events for today</h6>
          ) : (
            events
              .filter((item) => item.day === value.format("MM/DD/YY"))
              .map((item) => (
                <div key={item.id}>
                  <span>
                    - {item.from} - {item.to}
                  </span>
                  <span>{item.title}</span>
                  <button onClick={() => remove(item.id)}>remove</button>
                </div>
              ))
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="text"
            placeholder="event"
            onChange={(e) => setUserEvent(e.currentTarget.value)}
            value={userEvent}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="from"
            onChange={(e) => setUserFrom(e.currentTarget.value)}
            value={userFrom}
          />
          <input
            type="text"
            placeholder="to"
            onChange={(e) => setUserTo(e.currentTarget.value)}
            value={userTo}
          />
        </div>
      </div>
      <button onClick={() => submit()}>Add</button>
    </div>
  );
}
