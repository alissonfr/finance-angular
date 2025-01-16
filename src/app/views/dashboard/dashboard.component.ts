import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { BankAccountTransactionService } from "@services/api/bank-account-transaction.service";
import { ReportService } from "@services/api/report.service";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { DeleteTransactionOptions } from "src/app/enums/delete-transaction-options.enum";
import { Operation } from "src/app/enums/operation.enum";
import { TransactionStatus } from "src/app/enums/transaction-status.enum";
import { TransactionType } from "src/app/enums/transaction-type.enum";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";
import { FinancialReportDTO } from "src/app/models/financial-report";
import { FinTransactionModalComponent } from "src/app/shared/fin-ui/fin-transaction-modal/fin-transaction-modal.component";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";
import { BalanceCardComponent } from "./components/balance-card/balance-card.component";
import { ExpensesCardComponent } from "./components/expenses-card/expenses-card.component";
import { IncomesCardComponent } from "./components/incomes-card/incomes-card.component";

@Component({
    selector: "dashboard",
    standalone: true,
    imports: [CommonModule, BalanceCardComponent, IncomesCardComponent, ExpensesCardComponent, MatIconModule, FinUiModule, MatMenuModule],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {
    bankAccountTransactions: BankAccountTransaction[] = [];
    report: FinancialReportDTO;

    private readonly toastService = inject(ToastService);
    private readonly bankAccountTransactionService = inject(BankAccountTransactionService);
    private readonly reportService = inject(ReportService);
    private readonly dialog = inject(ModalService);

    get operations() {
        return Operation;
    }

    get transactionStatus() {
        return TransactionStatus;
    }

    ngOnInit() {
        this.loadTransactions();
        this.bankAccountTransactionService.transactionUpdated$.subscribe(() => this.loadTransactions());
    }

    changeStatus(id: number) {
        this.bankAccountTransactionService.updateStatus(id).subscribe({
            error: (e) => this.toastService.error(e, "Erro ao obter transações.")
        });
    }

    delete(transaction: BankAccountTransaction) {
        if(transaction.type === TransactionType.SINGLE) {
            this.deleteSingleTransaction(transaction);
            return;
        }

        this.deleteRecurringTransaction(transaction);
    }

    private deleteRecurringTransaction(transaction: BankAccountTransaction) {
        const dialogRef = this.dialog.deleteTransaction(transaction);
        dialogRef.afterClosed().subscribe((result) => {
            if(!result) return

            this.bankAccountTransactionService.delete(transaction.bankAccountTransactionId, result as DeleteTransactionOptions).subscribe({
                next: () => {
                    this.toastService.success("Transações apagadas com sucesso.")
                    this.loadTransactions();
                },
                error: e => this.toastService.error(e, "Erro ao apagar transações.")
            });
        });
    }
    
    private deleteSingleTransaction(transaction: BankAccountTransaction) {
        const dialogRef = this.dialog.confirm({
            title: "Apagar transação",
            message: `Você está prestes a apagar a transação "${transaction.description}". Você tem certeza?`
        });
        dialogRef.afterClosed().subscribe(result => {
            if(!result) return
            this.bankAccountTransactionService.delete(transaction.bankAccountTransactionId).subscribe({
                next: () => {
                    this.toastService.success("Transação apagada com sucesso.")
                    this.loadTransactions();
                },
                error: e => this.toastService.error(e, "Erro ao apagar transação.")
            });
            
                
        });
    }

    update(transaction: BankAccountTransaction) {
        const dialogRef = this.dialog.open(FinTransactionModalComponent, { data: { 
            operation: transaction.operation, 
            id: transaction.bankAccountTransactionId
        }});
        dialogRef.afterClosed().subscribe(() => this.loadTransactions());
    }
    
    private loadTransactions(): void {
        this.bankAccountTransactionService.find().subscribe({
            next: (result) => {
                this.bankAccountTransactions = result
                this.loadReport();
            },
            error: (e) => this.toastService.error(e, "Erro ao obter transações.")
        });
    }

    private loadReport(): void {
        this.reportService.getFinancialReport().subscribe({
            next: (result) => this.report = result,
            error: (e) => this.toastService.error(e, "Erro ao obter relatório.")
        });
    }

}