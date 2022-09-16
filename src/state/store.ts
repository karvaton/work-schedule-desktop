import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root";

export default function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']