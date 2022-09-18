import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iSchedule, iSchedules } from "../../models/iSchedules";

const SCHEDULES = 'schedules';
const savedSchedules = localStorage.getItem(SCHEDULES) || '[]';

const initialState: iSchedules = {
    schedules: JSON.parse(savedSchedules),
    active: 0,
    editing: 0,
}

function saveSchedulesState(state: string) {
    localStorage.setItem(SCHEDULES, state);
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
            saveSchedulesState(JSON.stringify(state.schedules));
        },

        remove(state, { payload }: PayloadAction<Pick<iSchedule, 'id'>>) {
            state.schedules = state.schedules.filter(({ id }) => id !== payload.id);
            if (state.active === payload.id) {
                state.active = 0;
            } 
        },

        startEditing(state, { payload }: PayloadAction<Pick<iSchedule, 'id'>>) {
            state.editing = payload.id;
        },

        finishEditing(state) {
            state.editing = 0;
        },

        edit(state, { payload }: PayloadAction<Omit<iSchedule, 'id'>>) {
            const id = state.editing;
            state.editing = 0;
            const schedule = state.schedules.find(schedule => schedule.id === id);
            const scheduleIndex = state.schedules.findIndex(element => element === schedule);
            state.schedules.splice(scheduleIndex, 1, {id, ...payload});
            saveSchedulesState(JSON.stringify(state.schedules));
        },
    }
});


export default SchedulesSlice.reducer;