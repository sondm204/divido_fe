import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllExpenses, getBillOfExpense } from "../../services/ExpenseService";


export interface Bill {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    owner: []
}

export interface ShareRatio {
    username: string;
    ratio: number;
}
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
    shareRatios: ShareRatio[];
    bills?: Bill[]
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
        builder.addCase(fetchBill.fulfilled, (state, action) => {
            const response = JSON.parse(action.payload);
            const expense = state.find(expense => expense.id === response.expenseId);
            if (expense) {
                expense.bills = response.bill;
            } else {
                // handle the case where no expense is found
            }
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

export const fetchBill = createAsyncThunk(
    "expenseEditor/fetchBill",
    async (expenseId: string, { rejectWithValue }) => {
        try {
            const response = await getBillOfExpense(expenseId);
            return JSON.stringify({
                expenseId: expenseId,
                bill: response
            });
        } catch (error) {
            return rejectWithValue("Failed to fetch expenses");
        }
    }
)

export default expenseEditorSlice.reducer;