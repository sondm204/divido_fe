
export const getUserById = async (params: { id: string }) => {
    const endpoint = `http://localhost:8080/users/${params.id}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

export const getUserByEmail = async (params: { email: string }) => {
    const endpoint = `http://localhost:8080/users/email/${params.email}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

export const getUsersByGroup = async (params: { groupId: string }) => {
    const endpoint = `http://localhost:8080/groups/${params.groupId}/users`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return {
        groupId: params.groupId,
        users: data
    };
}