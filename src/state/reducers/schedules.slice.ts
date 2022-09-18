import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iSchedule, iSchedules } from "../../models/iSchedules";


const initialState: iSchedules = {
    schedules: [],
    active: 0
}

export const SchedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        activate(state, { payload }: PayloadAction<Pick<iSchedule, 'id'>>) {
            state.active = payload.id;
        },

        add(state, { payload }: PayloadAction<Omit<iSchedule, 'id'>>) {
            const id = Date.now();
            const schedule = { 
                id,
                ...payload,
            };
            state.schedules.push(schedule);
            state.active = id;
        },
    }
});


export default SchedulesSlice.reducer;