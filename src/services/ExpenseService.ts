import { EXPENSE_SERVICE_URL, GROUP_SERVICE_URL } from "../components/commons/constants";

export const getAllExpenses = async (groupId: string) => {
    const endpoint = `${GROUP_SERVICE_URL}/${groupId}/expenses`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

export const getBillOfExpense = async (expenseId: string) => {
    const endpoint = `${EXPENSE_SERVICE_URL}/${expenseId}/bill`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return {
        expenseId: expenseId,
        bill: data
    };
}