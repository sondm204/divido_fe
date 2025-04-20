
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