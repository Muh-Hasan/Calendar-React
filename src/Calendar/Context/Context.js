import React, { createContext, useReducer, useEffect, useState } from "react";
import moment from "moment";

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
const calendar = [{ calendar: calendar }, { events: [] }];
