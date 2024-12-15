import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { BankAccountService } from "@services/api/bank-account.service";
import { ToastService } from "@services/toast.service";
import { BankAccount } from "src/app/models/bank-account";
import { FinFormsModule } from "../../shared/fin-forms/fin-forms.module";

@Component({
    selector: "bank-accounts",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinFormsModule],
    templateUrl: "./bank-accounts.component.html",
    styleUrl: "./bank-accounts.component.scss"
}) 
export class BankAccountComponent {
    bankAccounts: BankAccount[] = [];

    private bankAccountService = inject(BankAccountService);
    private toastService = inject(ToastService);

    ngOnInit() {
        this.bankAccountService.find().subscribe({
            next: (bankAccounts) => this.bankAccounts = bankAccounts,
            error: () => this.toastService.error("Erro ao obter transações.")
        })
    }

}
