import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TransactionCardComponent } from "@views/dashboard/components/transactions-card/transactions-card.component";
import { BalanceCardComponent } from "./components/balance-card/balance-card.component";
import { ExpensesCardComponent } from "./components/expenses-card/expenses-card.component";
import { IncomesCardComponent } from "./components/incomes-card/incomes-card.component";

@Component({
    selector: "dashboard",
    standalone: true,
    imports: [CommonModule, TransactionCardComponent, BalanceCardComponent, IncomesCardComponent, ExpensesCardComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {

}