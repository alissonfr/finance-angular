import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { BankAccountService } from "@services/api/bank-account.service";
import { ToastService } from "@services/toast.service";
import { BankAccount } from "src/app/models/bank-account";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";
import { FinFormsModule } from "../../shared/fin-forms/fin-forms.module";
import { BankAccountModalComponent } from "./components/bank-account-modal/bank-account-modal.component";

@Component({
    selector: "bank-accounts",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinFormsModule, FinUiModule],
    templateUrl: "./bank-accounts.component.html",
    styleUrl: "./bank-accounts.component.scss"
}) 
export class BankAccountComponent {
    bankAccounts: BankAccount[] = [];

    private readonly bankAccountService = inject(BankAccountService);
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(MatDialog);

    ngOnInit() {
        this.find();
    }

    find(): void {
        this.bankAccountService.find().subscribe({
            next: (bankAccounts) => this.bankAccounts = bankAccounts,
            error: () => this.toastService.error("Erro ao obter contas bancárias.")
        });
    }

    create() {
        const dialogRef = this.dialog.open(BankAccountModalComponent, { minWidth: "400px" });
        dialogRef.afterClosed().subscribe(() => this.find());
    }

}
