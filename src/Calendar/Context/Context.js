import React, { createContext, useReducer } from "react";
import Appreducer from "./Appreducer";

const initailState = {
  events: [],
};

export const EventsContext = createContext(initailState);

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Appreducer, initailState);

  function addingEvents(event) {
    dispatch({
      type: "addEvent",
      payload: event,
    });
  }
  function remove(id) {
    dispatch({
      type: "remove",
      payload: id,
    });
  }
  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        addingEvents,
        remove,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
