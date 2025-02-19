import { User } from "./user";

export class CreditCard {
    creditCardId: number;
    name: string;
    creditLimit: string;
    dueDay: string;
    closingDay: string;
    user: User;
}