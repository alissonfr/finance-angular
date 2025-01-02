import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Operation } from "src/app/enums/operation.enum";
import { TransactionType } from "src/app/enums/transaction-type.enum";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";
import { User } from "src/app/models/user";
import { BalanceCardComponent } from "./components/balance-card/balance-card.component";
import { ExpensesCardComponent } from "./components/expenses-card/expenses-card.component";
import { IncomesCardComponent } from "./components/incomes-card/incomes-card.component";

@Component({
    selector: "dashboard",
    standalone: true,
    imports: [CommonModule, BalanceCardComponent, IncomesCardComponent, ExpensesCardComponent, MatIconModule],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {
    bankAccountTransactions: BankAccountTransaction[] = [
        {
            bankAccountTransactionId: 1,
            description: "Netflix",
            date: new Date(),
            notes: "Despesa da netflix",
            amount: 29.99,
            operation: Operation.EXPENSE,
            type: TransactionType.RECURRENT,
            category: null as unknown as any,
            bankAccount: { bankAccountId: 1, name: "Conta Corrente", initialAmount: "1000", user: null as unknown as User },
            paymentMethod: { paymentMethodId: 1, name: "Cartão de Crédito" },
        },
    ]
}