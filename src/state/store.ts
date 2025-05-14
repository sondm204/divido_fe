import { configureStore } from "@reduxjs/toolkit";
import groupEditorReducer from "./GroupEditor/GroupEditorSlice";
import userEditorReducer from "./UserEditor/UserEditorSlice";

export const store = configureStore({
    reducer: {
        groupEditor: groupEditorReducer,
        userEditor: userEditorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;