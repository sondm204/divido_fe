export const getAllExpenses = async (groupId: string) => {
    const endpoint = `http://localhost:8080/groups/${groupId}/expenses`;
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
    const endpoint = `http://localhost:8080/expenses/${expenseId}/bill`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}