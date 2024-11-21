import { TransactionType } from "../enums/transaction-type.enum";
import { Account } from "./account";
import { CreditCard } from "./credit-card";
import { TransactionCategory } from "./transaction-category";
import { User } from "./user";

export class Transaction {
    transactionId?: number;
    date: Date;
    description: string;
    type: TransactionType;
    amount: string;
    category: TransactionCategory;
    account: Account;
    creditCard: CreditCard;
    user: User;
}