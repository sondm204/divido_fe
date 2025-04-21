import { configureStore } from "@reduxjs/toolkit";
import groupEditorReducer from "./GroupEditor/GroupEditorSlice";
import expenseEditorReducer from "./ExpenseEditor/ExpenseEditorSlice";

export const store = configureStore({
    reducer: {
        groupEditor: groupEditorReducer,
        expenseEditor: expenseEditorReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;