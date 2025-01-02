import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { BankAccountService } from "@services/api/bank-account.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/validators";
import { CategoryModalComponent } from "@views/categories/components/bank-account-modal/category-modal.component";
import { BankAccount } from "src/app/models/bank-account";
import { FinFormsModule } from "../../fin-forms/fin-forms.module";

@Component({
    selector: "fin-transaction-modal",
    standalone: true,
    imports: [CommonModule, FinFormsModule, ReactiveFormsModule, MatIconModule],
    templateUrl: "./fin-transaction-modal.component.html",
    styleUrl: "./fin-transaction-modal.component.scss"
})
export class FinTransactionModalComponent {
    formGroup = new FormGroup({
        bankAccountTransactionId: new FormControl(0),
        description: new FormControl("", [Validators.required]),
        date: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required]),
        operation: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        type: new FormControl("", [Validators.required]),
        bankAccount: new FormControl("", [Validators.required]),
        paymentMethod: new FormControl("", [Validators.required]),
        notes: new FormControl(""),
    });
      
    bankAccounts: BankAccount[] = [];
    expanded: boolean = false;
    private readonly dialog = inject(MatDialogRef<CategoryModalComponent>);
    private readonly data = inject(MAT_DIALOG_DATA);
    private readonly bankAccountService = inject(BankAccountService);
    private readonly toastService = inject(ToastService);
    
    ngOnInit() {
        // if(this.data?.id) ;
        this.find();
    }

    find(): void {
        this.bankAccountService.find(this.formGroup.getRawValue()).subscribe({
            next: (bankAccounts) => this.bankAccounts = bankAccounts,
            error: e => this.toastService.error(e, "Erro ao obter contas bancárias.")
        });
    }


    close(): void {
        this.dialog.close();
    }

    submit(): void {
        console.log(this.formGroup.value)
        if(isFormInvalid(this.formGroup)) {
            this.toastService.invalidForm();
            return;
        }
    }

    handleAddNew(aa: unknown) {
        console.log(aa)
    }
}
