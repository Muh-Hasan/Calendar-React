import React from 'react'
import  { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calender(){
  
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ]
    });
  
    calendar.render();
  })

  return(
    <div id='calendar'>
    </div>
  )
}