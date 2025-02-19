import { CreditCardTransaction } from "./credit-card-transaction";
import { User } from "./user";

export class CreditCardWithTransactions {
    creditCardId: number;
    name: string;
    creditLimit: string;
    dueDate: string;
    closingDate: string;
    user: User;
    totalAmount: number;
    transactions?: CreditCardTransaction[];
    isExpanded = false;
}