import { Group } from "@/state/GroupEditor/GroupEditorSlice";
import { GROUP_SERVICE_URL, USER_SERVICE_URL } from "../components/commons/constants";
import { User } from "../state/UserEditor/UserEditorSlice";

export const getGroup = async (params: {
    groupId: string
}) => {
    const endpoint = `${GROUP_SERVICE_URL}/${params.groupId}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
};

export const getGroups = async (params: {
    userId: string
}) => {
    const endpoint = `${USER_SERVICE_URL}/${params.userId}/groups`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
};

export const createGroup = async (params: {
    name: string,
    users?: User[],
    createdAt: string
}) => {
    const endpoint = `${GROUP_SERVICE_URL}`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: params.name,
            users: params.users,
            createdAt: params.createdAt
        })
    });

    const data = await response.json();
    return data;
};

export const editGroup = async (params: {
    group: Group
}) => {
    const endpoint = `${GROUP_SERVICE_URL}/${params.group.id}`;
    const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.group)
    });

    const data = await response.json();
    return {
        group: data.data
    };
};

export const deleteGroup = async (params: {
    groupId: string
}) => {
    const endpoint = `${GROUP_SERVICE_URL}/${params.groupId}`;
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
};