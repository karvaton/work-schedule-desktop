import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCalendar } from "../../models/iCalendar";

const today = new Date();

const initialState: iCalendar = {
    firstWeekday: 1,
    month: today.getMonth(),
    year: today.getFullYear()
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setYear(state, { payload }: PayloadAction<number>) {
            state.year = payload
        },

        setMonth(state, { payload }: PayloadAction<number>) {
            state.month = payload
        },

        setFirstWeekday(state, { payload }: PayloadAction<number>) {
            state.firstWeekday = payload
        }
    }
});

export default calendarSlice.reducer;