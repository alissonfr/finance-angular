import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TransactionService } from "@services/api/transaction.service";
import { DateControlService } from "@services/date-control.service";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { TransactionType } from "src/app/enums/transaction-type.enum";

@Component({
    selector: "transactions-card",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./transactions-card.component.html",
    styleUrl: "./transactions-card.component.scss",
})
export class TransactionCardComponent {

    transactions: TransactionDTO[] = [];

    columns: string[] = ["date", "description", "category.name", "account.name"];
    displayColumns: string[] = ["Data", "Descrição", "Categoria", "Conta"];

    public dateControlService = inject(DateControlService)
    public transactionService = inject(TransactionService)

    get TransactionType() {
        return TransactionType
    }

    ngOnInit() {
        this.getTransactions();
    }

    getTransactions() {
        this.transactionService.find(1, 9999).subscribe({
            next: result => this.transactions = result,
            error: e => console.error(e)
        });
    }

    handleSelectionChange(selectedRows: unknown[]) {
        console.log("Linhas selecionadas:", selectedRows);
    }

    getTransactionsAmount(transactions: TransactionDTO[]) {
        return transactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0)
    }
}


