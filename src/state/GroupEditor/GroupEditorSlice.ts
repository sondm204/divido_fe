import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteGroup, getGroups } from '../../services/GroupService';
import { getUsersByGroup } from '../../services/UserService';
import { createGroup } from "../../services/GroupService";
import { User } from "../UserEditor/UserEditorSlice";
import { Category } from "../ExpenseEditor/ExpenseEditorSlice";
import { getCategoriesByGroup } from "../../services/CategoryService";

export interface Group {
    id: string;
    name: string;
    users?: User[];
    categories?: Category[];
    createdAt: string;
}

export interface GroupEditorState {
    groups: Group[] | null;
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
                const group = Array.isArray(state.groups) ? state.groups.find(group => group.id === groupId) || null : null;
                if (group) {
                    group.users = users;
                }
            });
        builder
            .addCase(fetchCategoriesByGroup.fulfilled, (state, action) => {
                const { groupId, categories } = action.payload;
                const group = Array.isArray(state.groups) ? state.groups.find(group => group.id === groupId) || null : null;
                if (group) {
                    group.categories = categories;
                }
            });
        builder
            .addCase(createNewGroup.fulfilled, (state, action) => {
                state.groups = Array.isArray(state.groups) ? [...state.groups, action.payload.data] : [action.payload.data];
                state.selectedGroupId = action.payload.data.id;
        })
        builder
            .addCase(removeGroup.fulfilled, (state, action) => {
                state.groups = Array.isArray(state.groups) ? state.groups.filter(group => group.id !== action.payload) : null;
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

export const fetchCategoriesByGroup = createAsyncThunk(
    "groupEditor/fetchCategoriesByGroup",
    async (groupId: string, { rejectWithValue }) => {
        try {
            const response = await getCategoriesByGroup({ groupId });
            return response;
        } catch (error) {
            return rejectWithValue("Failed to fetch categories");
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

export const removeGroup = createAsyncThunk(
    "groupEditor/removeGroup",
    async (groupId: string, { rejectWithValue }) => {
        try {
            await deleteGroup({ groupId });
            return groupId;
        } catch (error) {
            return rejectWithValue("Failed to remove group");
        }
    }
)

export default groupEditorSlice.reducer;


