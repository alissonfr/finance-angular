import { User } from "./user";

export class BankAccount {
    bankAccountId?: number;
    name: string;
    initialAmount: number;
    user: User;
}