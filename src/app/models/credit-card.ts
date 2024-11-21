import { User } from "./user";

export class CreditCard {
    creditCardId?: number;
    name: string;
    creditLimit: string;
    brand: string;
    closingDate: Date;
    dueDate: Date;
    user: User;
}
