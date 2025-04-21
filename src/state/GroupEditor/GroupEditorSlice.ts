import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGroups } from '../../services/GroupService';

export interface Group {
    id: string;
    name: string;
}

export interface GroupEditorState {
    groups: Group[];
    selectedGroupId: string | null;
}
export const groupEditorInitialSlice: GroupEditorState = {
    groups: [],
    selectedGroupId: null
};

const groupEditorSlice = createSlice({
    name: "groupEditor",
    initialState: groupEditorInitialSlice,
    reducers: {
        setGroups: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
        },
        setSelectedGroupId: (state, action: PayloadAction<string>) => {
            state.selectedGroupId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.selectedGroupId = action.payload.length > 0 ? action.payload[0].id : null;
            });
    },
});

export const { setGroups, setSelectedGroupId } = groupEditorSlice.actions;



export const fetchGroups = createAsyncThunk(
    "groupEditor/fetchGroups",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getGroups({ userId });
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch groups");
        }
    }
);

export default groupEditorSlice.reducer;


