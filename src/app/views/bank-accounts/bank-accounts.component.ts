import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { BankAccountService } from "@services/api/bank-account.service";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { BankAccount } from "src/app/models/bank-account";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";
import { FinFormsModule } from "../../shared/fin-forms/fin-forms.module";
import { BankAccountModalComponent } from "./components/bank-account-modal/bank-account-modal.component";

@Component({
    selector: "bank-accounts",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinFormsModule, FinUiModule, MatMenuModule, ReactiveFormsModule],
    templateUrl: "./bank-accounts.component.html",
    styleUrl: "./bank-accounts.component.scss"
}) 
export class BankAccountComponent {
    bankAccounts: BankAccount[] = [];

    formGroup = new FormGroup({
        name: new FormControl(""),
    });

    private readonly bankAccountService = inject(BankAccountService);
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(ModalService);

    ngOnInit() {
        this.find();
    }

    find(): void {
        this.bankAccountService.find(this.formGroup.getRawValue()).subscribe({
            next: (bankAccounts) => this.bankAccounts = bankAccounts,
            error: e => this.toastService.error(e, "Erro ao obter contas bancárias.")
        });
    }

    create() {
        const dialogRef = this.dialog.open(BankAccountModalComponent);
        dialogRef.afterClosed().subscribe(() => this.find());
    }

    update(id?: number) {
        const dialogRef = this.dialog.open(BankAccountModalComponent, { data: { id } });
        dialogRef.afterClosed().subscribe(() => this.find());
    }

    delete(account: BankAccount) {
        const dialogRef = this.dialog.confirm({
            title: "Apagar conta bancária",
            message: `Você está prestes a apagar a conta bancária "${account.name}". Você tem certeza?`
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.bankAccountService.delete(account.bankAccountId).subscribe({
                    next: () => {
                        this.toastService.success("Conta bancária apagada com sucesso.")
                        this.find();
                    },
                    error: e => this.toastService.error(e, "Erro ao apagar conta bancária.")
                });
            }
            
        });
    }

    clear() {
        this.formGroup.reset();
        this.find();
    }
}
