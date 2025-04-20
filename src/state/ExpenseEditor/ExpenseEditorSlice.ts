
export interface Expense {
    id: string;
    category: string;
    amount: number;
    payer: string;
    spentAt: Date;
    note: string;
}