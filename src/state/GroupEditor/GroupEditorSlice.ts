import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGroups } from '../../services/GroupService';
import { getUsersByGroup } from '../../services/UserService';
import { createGroup } from "../../services/GroupService";
import { User } from "../Entities/EntitiesSlice";

export interface Group {
    id: string;
    name: string;
    users?: User[];
    createdAt: string;
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
        builder
            .addCase(fetchUsersByGroup.fulfilled, (state, action) => {
                const { groupId, users } = action.payload;
                const group = state.groups.find(group => group.id === groupId);
                if (group) {
                    group.users = users;
                }
            });
        builder
            .addCase(createNewGroup.fulfilled, (state, action) => {
                state.groups = [...state.groups, action.payload.data];
                state.selectedGroupId = action.payload.data.id;
        })
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

export const fetchUsersByGroup = createAsyncThunk(
    "groupEditor/fetchUsersByGroup",
    async (groupId: string, { rejectWithValue }) => {
        try {
            const response = await getUsersByGroup({ groupId });
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch users");
        }
    }
)

export const createNewGroup = createAsyncThunk(
    "groupEditor/createGroup",
    async (group: Group, { rejectWithValue }) => {
        try {
            const response = await createGroup(group);
            return response;
        } catch (error) {
            return rejectWithValue("Failed to create group");
        }
    }
)

export default groupEditorSlice.reducer;


