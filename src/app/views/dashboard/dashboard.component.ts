import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { BalanceCardComponent } from "./components/balance-card/balance-card.component";
import { ExpensesCardComponent } from "./components/expenses-card/expenses-card.component";
import { IncomesCardComponent } from "./components/incomes-card/incomes-card.component";

@Component({
    selector: "dashboard",
    standalone: true,
    imports: [CommonModule, BalanceCardComponent, IncomesCardComponent, ExpensesCardComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {

}