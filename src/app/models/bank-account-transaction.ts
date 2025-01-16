import { Operation } from "../enums/operation.enum";
import { TransactionStatus } from "../enums/transaction-status.enum";
import { TransactionType } from "../enums/transaction-type.enum";
import { BankAccount } from "./bank-account";
import { Category } from "./category";
import { PaymentMethod } from "./payment-method";

export class BankAccountTransaction {
    bankAccountTransactionId: number;
    description: string;
    date: Date;
    notes: string;
    amount: string;
    operation: Operation;
    status: TransactionStatus;
    type: TransactionType;
    category: Category;
    bankAccount: BankAccount;
    paymentMethod: PaymentMethod;
    recurrency: {
        installment?: number
        installments?: number
        total?: number
    }
}