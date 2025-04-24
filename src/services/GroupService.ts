import { User } from "../state/UserEditor/UserEditorSlice";

export const getGroups = async (params: {
    userId: string
}) => {
    const endpoint = `http://localhost:8080/users/${params.userId}/groups`;
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
    const endpoint = `http://localhost:8080/groups`;
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

export const deleteGroup = async (params: {
    groupId: string
}) => {
    const endpoint = `http://localhost:8080/groups/${params.groupId}`;
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
};