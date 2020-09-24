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
    setCalendar(tempArray);
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

  return (
    <div className="calendar">
      {calendar.map((week) => (
        <div>
          {week.map((day) => (
            <div className="day" onClick={() => setValue(day)}>
              <div className={dayStyles(day)}>
                {day.format("D").toString()}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
