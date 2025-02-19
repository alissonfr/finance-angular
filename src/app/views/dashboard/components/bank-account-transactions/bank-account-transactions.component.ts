import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { BankAccountTransactionService } from "@services/api/bank-account-transaction.service";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { DeleteTransactionOptions } from "src/app/enums/delete-transaction-options.enum";
import { Operation } from "src/app/enums/operation.enum";
import { TransactionStatus } from "src/app/enums/transaction-status.enum";
import { TransactionType } from "src/app/enums/transaction-type.enum";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";
import { FinTransactionModalComponent } from "src/app/shared/fin-ui/fin-transaction-modal/fin-transaction-modal.component";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";

@Component({
    selector: "bank-account-transactions",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinUiModule, MatMenuModule],
    templateUrl: "./bank-account-transactions.component.html",
})
export class BankAccountTransactionsComponent {
    bankAccountTransactions: BankAccountTransaction[] = [];

    private readonly bankAccountTransactionService = inject(BankAccountTransactionService);
    private readonly dialog = inject(ModalService);
    private readonly toastService = inject(ToastService);

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
            next: (result) => this.bankAccountTransactions = result,
            error: (e) => this.toastService.error(e, "Erro ao obter transações.")
        });
    }
}
