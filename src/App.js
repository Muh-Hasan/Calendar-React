import React from "react";
// import "./App.css";
import Calendar from "./Calendar/index";
import { EventsProvider } from "./Calendar/Context/Context";

function App() {
  return (
    <EventsProvider>
      <div>
        <Calendar />
      </div>
    </EventsProvider>
  );
}

export default App;
