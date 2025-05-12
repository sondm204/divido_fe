import { GROUP_SERVICE_URL } from "../components/commons/constants";

export const getCategoriesByGroup = async (params: { groupId: string }) => {
    const endpoint = `${GROUP_SERVICE_URL}/${params.groupId}/categories`;;
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