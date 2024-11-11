import { Account } from "./account";
import { TransactionCategory } from "./transaction-category";
import { User } from "./user";

export class Transaction {
    transactionId?: number;
    date: Date;
    description: string;
    amount: string;
    category: TransactionCategory;
    account: Account;
    user: User;
}