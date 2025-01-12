import { User } from "./user";

export class BankAccount {
    bankAccountId: number;
    name: string;
    initialAmount: string;
    totalAmount: string;
    user: User;
}