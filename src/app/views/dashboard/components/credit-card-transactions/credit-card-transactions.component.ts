import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { CreditCardService } from "@services/api/credit-card.service";
import { ToastService } from "@services/toast.service";
import { Operation } from "src/app/enums/operation.enum";
import { TransactionStatus } from "src/app/enums/transaction-status.enum";
import { CreditCardWithTransactions } from "src/app/models/credit-card-with-transactions";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";

@Component({
    selector: "credit-card-transactions",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinUiModule, MatMenuModule],
    templateUrl: "./credit-card-transactions.component.html",
})
export class CreditCardTransactionsComponent {
    creditCards: CreditCardWithTransactions[] = [];

    private readonly toastService = inject(ToastService);
    private readonly creditCardService = inject(CreditCardService);

    get operations() {
        return Operation;
    }

    get transactionStatus() {
        return TransactionStatus;
    }

    ngOnInit() {
        this.find();
    }

    find(): void {
        this.creditCardService.findWithTransactions().subscribe({
            next: (creditCards) => this.creditCards = creditCards,
            error: e => this.toastService.error(e, "Erro ao obter cartões de crédito.")
        });
    }
}
