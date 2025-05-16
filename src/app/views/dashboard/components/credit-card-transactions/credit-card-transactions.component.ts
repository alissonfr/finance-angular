import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { CreditCardService } from "@services/api/credit-card.service";
import { ToastService } from "@services/toast.service";
import { CreditCardWithTransactions } from "src/app/models/credit-card-with-transactions";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";
import { ChevronComponent } from "../../../../core/components/sidenav/components/header/components/date-view/components/chevron/chevron.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ModalService } from "@services/modal.service";
import { CreditCardModalComponent } from "@views/credit-cards/components/credit-card-modal/credit-card-modal.component";
import { CreditCardTransactionService } from "@services/api/credit-card-transaction.service";

// gradient: string;
//     icon: string;
// gradient: "cc-blue",
//             icon: "credit-card"
// gradient: "cc-red",
//             icon: "wallet"
// gradient: "cc-green",
//             icon: "credit-card"
// gradient: "cc-purple",
//             icon: "wallet"
// gradient: "cc-yellow",
//             icon: "credit-card"
// gradient: "cc-orange",
//             icon: "wallet"
// gradient: "cc-gray",
//             icon: "credit-card"
// gradient: "cc-blue-dark",
//             icon: "wallet"
// gradient: "cc-blue-light",
//             icon: "credit-card"
// gradient: "cc-black",
//             icon: "wallet"
// gradient: "cc-white",
//             icon: "credit-card"

@Component({
    selector: "credit-card-transactions",
    imports: [CommonModule, MatIconModule, FinUiModule, MatMenuModule, FinFormsModule, ChevronComponent, MatTooltipModule],
    templateUrl: "./credit-card-transactions.component.html"
})
export class CreditCardTransactionsComponent {
    creditCards: CreditCardWithTransactions[] = [];
    currentCardIndex: number = 0;

    private readonly toastService = inject(ToastService);
    private readonly creditCardService = inject(CreditCardService);
    private readonly creditCardTransactionService = inject(CreditCardTransactionService);
    private readonly dialog = inject(ModalService);

    formGroup = new FormGroup({
        search: new FormControl(""),
        sort: new FormControl(""),
    })

    sort: { label: string, value: string }[] = [
        { label: "Ordenar por Data", value: "date" },
        { label: "Ordenar por Valor", value: "amount" },
    ]

    ngOnInit() {
        this.findTransactions();
        this.creditCardService.transactionUpdated$.subscribe(() => this.findTransactions());
        this.creditCardTransactionService.transactionUpdated$.subscribe(() => this.findTransactions());
    }

    findTransactions(): void {
        this.creditCardService.findWithTransactions().subscribe({
            next: (cards) => {
                this.creditCards = cards;
                this.creditCards.push({} as CreditCardWithTransactions)
            },
            error: e => this.toastService.error(e, "Erro ao obter cartões de crédito.")
        });
    }
  
    nextCard() {
        this.currentCardIndex = (this.currentCardIndex + 1) % this.creditCards.length;
    }

    previousCard() {
        this.currentCardIndex = (this.currentCardIndex - 1 + this.creditCards.length) % this.creditCards.length;
    }

    create() {
        const dialogRef = this.dialog.open(CreditCardModalComponent);
        dialogRef.afterClosed().subscribe(() => this.findTransactions());
    }

    changeCard(index: number) {
        this.currentCardIndex = index;
    }
}
