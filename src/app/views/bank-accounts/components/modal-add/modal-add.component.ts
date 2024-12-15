import { CommonModule, formatDate } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BankAccountService } from "@services/api/bank-account.service";
import { DateControlService } from "@services/date-control.service";
import { ToastService } from "@services/toast.service";
import { firstValueFrom } from "rxjs";
import { BankAccount } from "src/app/models/bank-account";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "app-modal-add",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule],
    templateUrl: "./modal-add.component.html",
    styleUrl: "./modal-add.component.scss"
})
export class ModalAddComponent {
    formGroup = new FormGroup({
        date: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required]),

        categoryId: new FormControl("", [Validators.required]),
        accountId: new FormControl("", [Validators.required]),
    });
    bankAccounts: BankAccount[] = [];
    
    private dateControlService = inject(DateControlService)
    private bankAccountService = inject(BankAccountService)
    private toastService = inject(ToastService);

    ngOnInit() {
        this.initDateInput();

        this.bankAccountService.find().subscribe({
            next: result => this.bankAccounts = result,
            error: () => this.toastService.error("Erro ao realizar login.")
        });
    }

    async initDateInput(): Promise<void> {
        const date = new Date();
        date.setFullYear(await firstValueFrom(this.dateControlService.year));
        date.setMonth(await firstValueFrom(this.dateControlService.monthIndex));
        
        console.log(formatDate(date, "yyyy-MM-dd", "pt-BR"))
        this.formGroup.get("date")?.setValue(formatDate(date, "yyyy-MM-dd", "pt-BR"));

    }

    submit(): void {
        console.log(this.formGroup.value)
    }

    handleAddNew(prop: string) {
        console.log(prop)
    }
}
