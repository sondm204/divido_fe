import { getUserById } from "../../services/UserService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    name: string;
    email: string;
}

export const userEditorInitialSlice: User = {
    id: "",
    name: "",
    email: ""
};

export const userEditorSlice = createSlice({
    name: "userEditor",
    initialState: userEditorInitialSlice,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
            })
    }
});

export const fetchCurrentUser = createAsyncThunk(
    "userEditor/fetchCurrentUser",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getUserById({ id: userId });
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch user");
        }
    }
);


export const { setCurrentUser } = userEditorSlice.actions;

export default userEditorSlice.reducer;
