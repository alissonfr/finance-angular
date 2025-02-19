import { TransactionType } from "../enums/transaction-type.enum"
import { Category } from "./category"
import { CreditCard } from "./credit-card"

export class CreditCardTransaction {
    creditCardTransactionId: number
    description: string
    date: Date
    finTransactionId: string
    notes: string
    amount: number
    type: TransactionType
    category: Category
    creditCard: CreditCard
}
