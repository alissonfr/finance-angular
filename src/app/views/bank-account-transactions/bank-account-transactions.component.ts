import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { BankAccountTransactionService } from "@services/api/bank-account-transaction.service";
import { ToastService } from "@services/toast.service";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";
import { DateViewComponent } from "../../core/components/sidenav/components/header/components/date-view/date-view.component";

@Component({
    selector: "bank-account-transactions",
    standalone: true,
    imports: [CommonModule, MatIconModule, DateViewComponent],
    templateUrl: "./bank-account-transactions.component.html",
    styleUrl: "./bank-account-transactions.component.scss"
}) 
export class BankAccountTransactionsComponent {
    transactions: BankAccountTransaction[] = [];

    private transactionsService = inject(BankAccountTransactionService);
    private toastService = inject(ToastService);

    ngOnInit() {
        this.transactionsService.find().subscribe({
            next: (transactions) => this.transactions = transactions,
            error: e => this.toastService.error(e, "Erro ao obter transações.")
        })
    }

}
