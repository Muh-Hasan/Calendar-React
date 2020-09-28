import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Editable from "./components/Editable";
import "./calendar.css";
import { EventsContext } from "./Context/Context";

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
  const { events } = useContext(EventsContext);
  function dayStyles(day) {
    if (beforeToday(day)) return "before";
    if (isSelected(day)) return "selected-day";
    if (isToday(day)) return "active-day";
    if (events.filter((item) => item.day === value.format("MM/DD/YY")))
      return "event-day";
    return "";
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
  return (
    <div className="calendar disable-selection">
      <Editable value={value} />
      <div className="right-side">
        <div className="text-right calendar-change-year">
          <div className="calendar-change-year-slider">
            <span
              className="fa fa-caret-left cursor-pointer calendar-change-year-slider-prev"
              onClick={() => setValue(prevMonth())}
            ></span>
            <span className="calendar-current-year">{currYear()}</span>
            <span
              className="fa fa-caret-right cursor-pointer calendar-change-year-slider-next"
              onClick={() => setValue(nextMonth())}
            ></span>
          </div>
        </div>
        <div className="calendar-month-list">
          <ul className="calendar-month">
            {moment.monthsShort().map((m, i) => (
              <li key={i} className={value.format("MMM") === m ? "active" : ""}>
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="calendar-week-list">
          <ul className="calendar-week">
            {moment.weekdaysShort().map((d, i) => (
              <li
                key={i}
                className={value.format("ddd") === d ? "weekActive" : ""}
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="calendar-day-list">
          {calendar.map((week, i) => (
            <ul className="calendar-days" key={i}>
              {week.map((day, i) => (
                <li
                  key={i}
                  className={dayStyles(day)}
                  onClick={() => !beforeToday(day) && setValue(day)}
                >
                  {day.format("D").toString()}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
