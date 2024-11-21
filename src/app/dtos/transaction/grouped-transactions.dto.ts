import { Account } from "src/app/models/account";
import { CreditCard } from "src/app/models/credit-card";
import { Transaction } from "src/app/models/transaction";

export class GroupedAccount {
    account: Account;
    transactions: Transaction[];
}

export class GroupedCreditCard {
    creditCard: CreditCard;
    transactions: Transaction[];
}

export class GroupedTransactions {
    accounts: GroupedAccount[];
    creditCards: GroupedCreditCard[];
}

