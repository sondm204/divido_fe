import { configureStore } from "@reduxjs/toolkit";
import groupEditorReducer from "./GroupEditor/GroupEditorSlice";

export const store = configureStore({
    reducer: {
        groupEditor: groupEditorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;