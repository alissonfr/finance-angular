import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BankAccountService } from "@services/api/bank-account.service";
import { ToastService } from "@services/toast.service";
import { BankAccount } from "src/app/models/bank-account";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "bank-account-modal",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule],
    templateUrl: "./bank-account-modal.component.html",
    styleUrl: "./bank-account-modal.component.scss"
})
export class BankAccountModalComponent {
    formGroup = new FormGroup({
        name: new FormControl("", [Validators.required]),
        initialAmount: new FormControl("", [Validators.required]),
    });

    bankAccount: BankAccount;
    
    private readonly bankAccountService = inject(BankAccountService)
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(MatDialogRef<BankAccountModalComponent>);
    private readonly data = inject(MAT_DIALOG_DATA);

    ngOnInit() {
        if(this.data.id) {
            this.bankAccountService.get(this.data.id).subscribe({
                next: result => this.bankAccount = result,
                error: () => this.toastService.error("Erro ao obter conta bancária.")
            });
        } 
    }

    close(): void {
        this.dialog.close();
    }

    submit(): void {
        console.log(this.formGroup.value)
    }
}
