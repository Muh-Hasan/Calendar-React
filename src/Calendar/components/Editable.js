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
      <div className="edit-date">
        <h1>{value.format("DD")}</h1>
        <h3>{value.format("dddd")}</h3>
      </div>
      <div>
        <div>
          {events.length <= 0 ? (
            <div className="no-event">
              <h6>No events for today</h6>
            </div>
          ) : (
            <div className="events">
              {events
                .filter((item) => item.day === value.format("MM/DD/YY"))
                .map((item) => (
                  <div key={item.id} className="event-list">
                    <h4>
                      {item.from} - {item.to}
                    </h4>
                    <h4>{item.title}</h4>
                    <button  onClick={() => remove(item.id)}>x</button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            maxLength={10}
            type="text"
            placeholder="event"
            onChange={(e) => setUserEvent(e.currentTarget.value)}
            value={userEvent}
            required={true}
            className='input-1'
          />
        </div>
        <div className='from-to'>
          <input
            required={true}
            type="number"
            placeholder="from"
            onChange={(e) => setUserFrom(e.currentTarget.value)}
            value={userFrom}
          />
          <input
            className='one-input'
            required={true}
            type="number"
            placeholder="to"
            onChange={(e) => setUserTo(e.currentTarget.value)}
            value={userTo}
          />
        </div>
      </div>
      <div className='btn-submit'>
      <button   onClick={() => submit()}>Add</button>
      </div>
    </div>
  );
}
