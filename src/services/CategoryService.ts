
export const getCategoriesByGroup = async (params: { groupId: string }) => {
    const endpoint = `http://localhost:8080/groups/${params.groupId}/categories`;;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return {
        groupId: params.groupId,
        categories: data
    };
}