import React from "react";
import Fullcalendar from "@fullcalendar/react";
import bootstrapPlugin from '@fullcalendar/bootstrap';


export default function Calender({ basic, withDragable }) {
  return <Fullcalendar plugins={[bootstrapPlugin]}   themeSystem='bootstrap'/>;
}
