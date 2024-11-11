import { User } from "./user";

export class Account {
    accountId?: number;
    name: string;
    initialAmount: string;
    user: User;
}
