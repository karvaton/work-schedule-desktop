import { createSlice } from "@reduxjs/toolkit";
import { iDialog } from "../../models/iDialog";

const initialState: iDialog = {
    opened: false
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        open(state) {
            state.opened = true
        },
        close(state) {
            state.opened = false
        },
    }
});

export default dialogSlice.reducer;