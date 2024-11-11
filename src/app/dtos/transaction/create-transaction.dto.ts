
export interface CreateTransactionDTO {
    date: Date;
    description: string;
    amount: string;
    categoryId: number;
    accountId: number;
    userId: number;
}