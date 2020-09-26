export default (state, action) => {
  switch (action.type) {
    case "addEvent":
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case "remove":
      return {
        ...state,
        events: state.events.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
