import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iSchedule, iSchedules } from "../../models/iSchedules";


const SCHEDULES = 'schedules';
const LAST_ACTIVE = 'active';
const savedSchedules = localStorage.getItem(SCHEDULES) || '[]';
const lastActive = localStorage.getItem(LAST_ACTIVE) || '0';

const initialState: iSchedules = {
    schedules: JSON.parse(savedSchedules),
    active: Number(lastActive),
    editing: 0,
}


export const SchedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        activate(state, { payload }: PayloadAction<Pick<iSchedule, 'id'>>) {
            state.active = payload.id;
            saveActiveState(payload.id);
        },

        add(state, { payload }: PayloadAction<Omit<iSchedule, 'id' | 'exceptions'>>) {
            const id = Date.now();
            const exceptions = {};
            const schedule = { 
                id,
                ...payload,
                exceptions
            };
            state.schedules.push(schedule);
            state.active = id;
            saveSchedulesState(JSON.stringify(state.schedules));
            saveActiveState(id);
        },

        remove(state, { payload }: PayloadAction<Pick<iSchedule, 'id'>>) {
            state.schedules = state.schedules.filter(({ id }) => id !== payload.id);
            if (state.active === payload.id) {
                state.active = 0;
                saveActiveState(0);
            } 
            saveSchedulesState(JSON.stringify(state.schedules));
        },

        startEditing(state, { payload }: PayloadAction<Pick<iSchedule, 'id'>>) {
            state.editing = payload.id;
        },

        finishEditing(state) {
            state.editing = 0;
        },

        edit(state, { payload }: PayloadAction<Omit<iSchedule, 'id' | 'exceptions'>>) {
            const id = state.editing;
            state.editing = 0;
            const schedule = state.schedules.find(schedule => schedule.id === id);
            const exceptions = schedule?.exceptions || {};
            const scheduleIndex = state.schedules.findIndex(element => element === schedule);
            if (scheduleIndex >= 0) {
                state.schedules.splice(scheduleIndex, 1, { id, ...payload, exceptions });
            }
            saveSchedulesState(JSON.stringify(state.schedules));
        },

        addException(state, { payload }: PayloadAction<[number, number]>) {
            const active = state.active;
            const index = state.schedules.findIndex(({ id }) => id === active);
            const [timestamp, value] = payload;
            if (index >= 0) {
                state.schedules[index].exceptions[timestamp] = value;
            }
            saveSchedulesState(JSON.stringify(state.schedules));
        },
    }
});


function saveSchedulesState(state: string) {
    localStorage.setItem(SCHEDULES, state);
}

function saveActiveState(active: number) {
    localStorage.setItem(LAST_ACTIVE, String(active));
}


export default SchedulesSlice.reducer;