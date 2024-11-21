import { CommonModule, formatDate } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FinFormsModule } from "@core/shared/fin-forms/fin-forms.module";
import { AccountService } from "@services/api/account.service";
import { TransactionCategoryService } from "@services/api/transaction-category.service";
import { DateControlService } from "@services/date-control.service";
import { firstValueFrom } from "rxjs";
import { AccountDTO } from "src/app/dtos/account/account.dto";
import { TransactionCategoryDTO } from "src/app/dtos/transaction-category/transaction-category.dto";

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
    accounts: AccountDTO[] = [];
    categories: TransactionCategoryDTO[] = [];
    
    private dateControlService = inject(DateControlService)
    private accountService = inject(AccountService)
    private transactionCategoryService = inject(TransactionCategoryService)

    ngOnInit() {
        this.initDateInput();

        this.accountService.find().subscribe({
            next: result => this.accounts = result,
            error: e => console.error(e)
        });
        this.transactionCategoryService.find().subscribe({
            next: result => this.categories = result,
            error: e => console.error(e)
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
