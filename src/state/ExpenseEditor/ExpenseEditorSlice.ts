import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllExpenses } from "../../services/ExpenseService";

export interface Category {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Expense {
    id: string;
    category: Category;
    amount: number;
    payer: User;
    spentAt: Date;
    note: string;
}

export const expenseEditorInitalSlice: Expense[] = [];

const expenseEditorSlice = createSlice({
    name: 'expenseEditor',
    initialState: expenseEditorInitalSlice,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpenses.fulfilled, (state, action) => {
            return state = action.payload;
        });
    }
})

export const fetchExpenses = createAsyncThunk(
    "expenseEditor/fetchExpenses",
    async (groupId: string, { rejectWithValue }) => {
        try {
            const response = await getAllExpenses(groupId);
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch expenses");
        }
    }
) 

export default expenseEditorSlice.reducer;