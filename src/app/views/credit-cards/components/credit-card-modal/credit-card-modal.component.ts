import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CreditCardService } from "@services/api/credit-card.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/form-validator";
import { CreditCard } from "src/app/models/credit-card";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "credit-card-modal",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule],
    templateUrl: "./credit-card-modal.component.html",
    styleUrl: "./credit-card-modal.component.scss"
})
export class CreditCardModalComponent {
    formGroup = new FormGroup({
        creditCardId: new FormControl(0),
        name: new FormControl("", [Validators.required]),
        creditLimit: new FormControl("", [Validators.required]),
        dueDay: new FormControl("", [Validators.required]),
        closingDay: new FormControl("", [Validators.required]),
    });
    
    private readonly creditCardService = inject(CreditCardService)
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(MatDialogRef<CreditCardModalComponent>);
    private readonly data = inject(MAT_DIALOG_DATA);

    ngOnInit() {
        if(this.data?.id) this.get(this.data.id);
        if(this.data?.name) this.formGroup.get("name")?.patchValue(this.data.name);
    }

    close(): void {
        this.dialog.close();
    }

    submit(): void {
        if(isFormInvalid(this.formGroup)) {
            this.toastService.invalidForm();
            return;
        }

        const creditCard = this.formGroup.getRawValue() as unknown as CreditCard;
        console.log(creditCard)

        if(creditCard.creditCardId) {
            this.update(creditCard.creditCardId, creditCard);
        } else {
            this.create(creditCard)
        }
    }

    private get(id: number): void {
        this.creditCardService.get(id).subscribe({
            next: result => this.formGroup.patchValue(result),
            error: e => this.toastService.error(e, "Erro ao obter cartão de crédito.")
        });
    }

    private create(creditCard: CreditCard) {
        this.creditCardService.create(creditCard).subscribe({
            next: () => {
                this.toastService.success("Cartão de crédito criada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao criar cartão de crédito.")
        });
    }

    private update(id: number, creditCard: CreditCard) {
        this.creditCardService.update(id, creditCard).subscribe({
            next: () => {
                this.toastService.success("Cartão de crédito atualizado com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao atualizar cartão de crédito.")
        });
    }
}
