import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReportService } from "@services/api/report.service";
import { ToastService } from "@services/toast.service";
import { FinancialReportDTO } from "src/app/models/financial-report";
import { BalanceCardComponent } from "./components/balance-card/balance-card.component";
import { BankAccountTransactionsComponent } from "./components/bank-account-transactions/bank-account-transactions.component";
import { ExpensesCardComponent } from "./components/expenses-card/expenses-card.component";
import { IncomesCardComponent } from "./components/incomes-card/incomes-card.component";
import { CreditCardTransactionsComponent } from "./components/credit-card-transactions/credit-card-transactions.component";

@Component({
    selector: "dashboard",
    standalone: true,
    imports: [CommonModule, BalanceCardComponent, IncomesCardComponent, ExpensesCardComponent, BankAccountTransactionsComponent, CreditCardTransactionsComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {
    report: FinancialReportDTO;

    private readonly toastService = inject(ToastService);
    private readonly reportService = inject(ReportService);

    private loadReport(): void {
        this.reportService.getFinancialReport().subscribe({
            next: (result) => this.report = result,
            error: (e) => this.toastService.error(e, "Erro ao obter relatório.")
        });
    }

}