import { User } from "./user";

export class CreditCard {
    creditCardId?: number;
    name: string;
    creditLimit: number;
    dueDay: number;
    closingDay: number;
    user: User;
}