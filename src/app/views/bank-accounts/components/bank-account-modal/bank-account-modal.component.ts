import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BankAccountService } from "@services/api/bank-account.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/form-validator";
import { BankAccount } from "src/app/models/bank-account";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "bank-account-modal",
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule],
    templateUrl: "./bank-account-modal.component.html",
    styleUrl: "./bank-account-modal.component.scss"
})
export class BankAccountModalComponent {
    formGroup = new FormGroup({
        bankAccountId: new FormControl(0),
        name: new FormControl("", [Validators.required]),
        initialAmount: new FormControl("", [Validators.required]),
    });
    
    private readonly bankAccountService = inject(BankAccountService)
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(MatDialogRef<BankAccountModalComponent>);
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

        const bankAccount = this.formGroup.getRawValue() as unknown as BankAccount;

        if(bankAccount.bankAccountId) {
            this.update(bankAccount.bankAccountId, bankAccount);
        } else {
            this.create(bankAccount)
        }
    }

    private get(id: number): void {
        this.bankAccountService.get(id).subscribe({
            next: result => this.formGroup.patchValue(result),
            error: e => this.toastService.error(e, "Erro ao obter conta bancária.")
        });
    }

    private create(bankAccount: BankAccount) {
        this.bankAccountService.create(bankAccount).subscribe({
            next: () => {
                this.toastService.success("Conta bancária criada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao criar conta bancária.")
        });
    }

    private update(id: number, bankAccount: BankAccount) {
        this.bankAccountService.update(id, bankAccount).subscribe({
            next: () => {
                this.toastService.success("Conta bancária atualizada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao atualizar conta bancária.")
        });
    }
}
