import { combineReducers } from "@reduxjs/toolkit";
import calendarReduser from "./calendar.slice";
import schedulesSlice from "./schedules.slice";

const rootReducer = combineReducers({
    calendar: calendarReduser,
    schedules: schedulesSlice,
});

export default rootReducer;