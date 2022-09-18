import { combineReducers } from "@reduxjs/toolkit";
import calendarReduser from "./calendar.slice";
import dialogReducer from "./dialog.slice";
import schedulesSlice from "./schedules.slice";

const rootReducer = combineReducers({
    calendar: calendarReduser,
    dialog: dialogReducer,
    schedules: schedulesSlice,
});

export default rootReducer;