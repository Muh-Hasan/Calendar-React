import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { EventsContext } from "./Context/Context";

export default function Calendar() {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);
  const [isEvent, setIsEvent] = useState(false);
  const [id, setId] = useState(0);
  const [currDay, setcurrDay] = useState("");
  const [userEvent, setUserEvent] = useState("");
  const [userFrom, setUserFrom] = useState("");
  const [userTo, setUserTo] = useState("");
  const { events, addingEvents, remove } = useContext(EventsContext);
  let startDay = value.clone().startOf("month").startOf("week");
  let endDay = value.clone().endOf("month").endOf("week");
  let day = startDay.clone().subtract(1, "day");

  useEffect(() => {
    let tempArray = [];
    while (day.isBefore(endDay, "day")) {
      tempArray.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    setCalendar(tempArray); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function isSelected(day) {
    return value.isSame(day, "day");
  }
  function beforeToday(day) {
    return day.isBefore(new Date(), "day");
  }
  function isToday(day) {
    return day.isSame(new Date(), "day");
  }
  function dayStyles(day) {
    if (beforeToday(day)) return "before";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    return "";
  }
  function currMonthName() {
    return value.format("MMM");
  }
  function currYear() {
    return value.format("YYYY");
  }
  function prevMonth() {
    return value.clone().subtract(1, "month");
  }
  function nextMonth() {
    return value.clone().add(1, "month");
  }
  function setCurrentDay(day) {
    setcurrDay(day);
  }
  function submit() {
    setId(id + 1);
    addingEvents({
      id: id,
      day: day.format("MM/DD/YY"),
      title: userEvent,
      from: userFrom,
      to: userTo,
    });
  }
  // function show() {
  //   let showingEvents = ;
  //   return (
  //     <div>
  //       {showingEvents.map((item) => (
  //         <div>
  //           <h6>{item.title}</h6>
  //           <button onClick={remove(item.id)}>remove</button>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }
  console.log(events.filter((item) => item.day === day.format("MM/DD/YY")));
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="event"
          onChange={(e) => setUserEvent(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="from"
          onChange={(e) => setUserFrom(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="to"
          onChange={(e) => setUserTo(e.currentTarget.value)}
        />
        <button onClick={() => submit()}>Add</button>
        {events.length <= 0
          ? ""
          : events
              .filter((item) => item.day === day.format("MM/DD/YY"))
              .map((item) => (
                <div key={item.id}>
                  <h6>{item.title}</h6>
                </div>
              ))}
      </div>
      <div className="calendar">
        <div className="header">
          <div className="previous" onClick={() => setValue(prevMonth())}>
            {String.fromCharCode(171)}
          </div>
          <div className="current">
            {currMonthName()} {currYear()}
          </div>
          <div className="next" onClick={() => setValue(nextMonth())}>
            {String.fromCharCode(187)}
          </div>
        </div>
        <div className="body">
          <div className="day-names">
            {moment.weekdaysShort().map((d, i) => (
              <div className="week" key={i}>
                {d}
              </div>
            ))}
          </div>
          {calendar.map((week, i) => (
            <div key={i}>
              {week.map((day, i) => (
                <div
                  key={i}
                  className="day"
                  onClick={() => !beforeToday(day) && setValue(day)}
                >
                  <div
                    className={dayStyles(day)}
                    onClick={() => !beforeToday(day) && setCurrentDay(day)}
                  >
                    {day.format("D").toString()}
                  </div>
                  <div></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
