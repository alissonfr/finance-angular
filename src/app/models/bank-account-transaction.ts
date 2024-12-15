import { Operation } from "../enums/operation.enum";
import { TransactionType } from "../enums/transaction-type.enum";
import { BankAccount } from "./bank-account";
import { PaymentMethod } from "./payment-method";


export class BankAccountTransaction {
    bankAccountTransactionId?: number;
    description: string;
    date: Date;
    notes: string;
    amount: number;
    operation: Operation;
    type: TransactionType;
    bankAccount: BankAccount;
    paymentMethod: PaymentMethod;
}