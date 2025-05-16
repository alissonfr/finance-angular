import { CreditCardTransaction } from "./credit-card-transaction";
import { Issuer } from "./issuer.";
import { User } from "./user";

export class CreditCardWithTransactions {
    creditCardId: number;
    name: string;
    creditLimit: string;
    dueDate: string;
    closingDate: string;
    user: User;
    issuer?: Issuer;
    totalAmount: number;
    transactions?: CreditCardTransaction[];
}