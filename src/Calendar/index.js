import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Calendar() {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);
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

  const [isEvent, setIsEvent] = useState(false);
  const [addEvents, setEvents] = useState([]);
  const [id , setId] = useState(0)
  let eventsArray = []
  function addEvent(day) {
    setId(id+1)
    setIsEvent(true);
    let takingValue = prompt(`add an event ${day.format('MM/DD/YY')}`);
    eventsArray.push({id : id  , title : takingValue , day : day}, ...eventsArray)
  }
  
  console.log(eventsArray);
  return (
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
          {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
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
                <div className={dayStyles(day)} onClick={() => addEvent(day)}>
                  {day.format("D").toString()}
                </div>
            {/* {isEvent ? <div>{addEvent.map(item => <h1>{item.title}</h1>)}</div> : ''} */}
              </div>
            ))}
          </div>
        ))}
      </div>
            <div>{eventsArray.map(item => <h1>{item.title}</h1>)}</div>
    </div>
  );
}
