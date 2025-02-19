import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";
import { FinFormsModule } from "../../shared/fin-forms/fin-forms.module";
import { CreditCardModalComponent } from "./components/credit-card-modal/credit-card-modal.component";
import { CreditCard } from "src/app/models/credit-card";
import { CreditCardService } from "@services/api/credit-card.service";

@Component({
    selector: "credit-cards",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinFormsModule, FinUiModule, MatMenuModule, ReactiveFormsModule],
    templateUrl: "./credit-cards.component.html",
    styleUrl: "./credit-cards.component.scss"
}) 
export class CreditCardsComponent {
    creditCards: CreditCard[] = [];

    formGroup = new FormGroup({
        name: new FormControl(""),
    });

    private readonly creditCardService = inject(CreditCardService);
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(ModalService);

    ngOnInit() {
        this.find();
    }

    find(): void {
        this.creditCardService.find(this.formGroup.getRawValue()).subscribe({
            next: (creditCards) => this.creditCards = creditCards,
            error: e => this.toastService.error(e, "Erro ao obter cartões de crédito.")
        });
    }

    create() {
        const dialogRef = this.dialog.open(CreditCardModalComponent);
        dialogRef.afterClosed().subscribe(() => this.find());
    }

    update(id?: number) {
        const dialogRef = this.dialog.open(CreditCardModalComponent, { data: { id } });
        dialogRef.afterClosed().subscribe(() => this.find());
    }

    delete(account: CreditCard) {
        const dialogRef = this.dialog.confirm({
            title: "Apagar cartão de crédito",
            message: `Você está prestes a apagar um cartão de crédito "${account.name}". Você tem certeza?`
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.creditCardService.delete(account.creditCardId).subscribe({
                    next: () => {
                        this.toastService.success("Cartão de crédito apagado com sucesso.")
                        this.find();
                    },
                    error: e => this.toastService.error(e, "Erro ao apagar cartão de crédito.")
                });
            }
            
        });
    }

    clear() {
        this.formGroup.reset();
        this.find();
    }
}
