import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { BankAccountTransactionService } from "@services/api/bank-account-transaction.service";
import { BankAccountService } from "@services/api/bank-account.service";
import { CategoryService } from "@services/api/category.service";
import { PaymentMethodService } from "@services/api/payment-method.service";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/form-validator";
import { BankAccountModalComponent } from "@views/bank-accounts/components/bank-account-modal/bank-account-modal.component";
import { CategoryModalComponent } from "@views/categories/components/bank-account-modal/category-modal.component";
import { Operation } from "src/app/enums/operation.enum";
import { TransactionType } from "src/app/enums/transaction-type.enum";
import { BankAccount } from "src/app/models/bank-account";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";
import { Category } from "src/app/models/category";
import { PaymentMethod } from "src/app/models/payment-method";
import { FinFormsModule } from "../../fin-forms/fin-forms.module";

export const CreateOperationLabels = new Map<Operation, string>([
    [Operation.INCOME, "Nova receita"],
    [Operation.EXPENSE, "Nova despesa"],
]);

export const UpdateOperationLabels = new Map<Operation, string>([
    [Operation.INCOME, "Atualizar receita"],
    [Operation.EXPENSE, "Atualizar despesa"],
]);

@Component({
    selector: "fin-transaction-modal",
    standalone: true,
    imports: [CommonModule, FinFormsModule, ReactiveFormsModule, MatIconModule, MatMenuModule, MatDatepickerModule],
    templateUrl: "./fin-transaction-modal.component.html",
    styleUrl: "./fin-transaction-modal.component.scss"
})
export class FinTransactionModalComponent {
    expanded: boolean = false;
    operations = Operation;
    types = TransactionType;
    formGroup = new FormGroup({
        bankAccountTransactionId: new FormControl(0),
        description: new FormControl("", [Validators.required]),
        date: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required]),
        operation: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        type: new FormControl(TransactionType.SINGLE, [Validators.required]),
        bankAccount: new FormControl("", [Validators.required]),
        paymentMethod: new FormControl("", [Validators.required]),
        notes: new FormControl(""),
    });
      
    bankAccounts: BankAccount[] = [];
    categories: Category[] = [];
    paymentMethods: PaymentMethod[] = [];

    private readonly modalService = inject(ModalService);
    private readonly dialog = inject(MatDialogRef<CategoryModalComponent>);
    private readonly data = inject(MAT_DIALOG_DATA);
    private readonly bankAccountService = inject(BankAccountService);
    private readonly categoryService = inject(CategoryService);
    private readonly paymentMethodService = inject(PaymentMethodService);
    private readonly toastService = inject(ToastService);
    private readonly bankAccountTransactionService = inject(BankAccountTransactionService);

    get title() {
        const operation = this.data.operation as Operation;
        if(this.data?.id) return UpdateOperationLabels.get(operation);
        return CreateOperationLabels.get(operation);
    }

    get icon() {
        return this.data.operation ? "show_chart" : "credit_card";
    }

    get operation() {
        return this.data.operation as Operation;
    }
    
    ngOnInit() {
        const operation = this.data.operation as Operation;
        this.formGroup.get("operation")?.patchValue(operation);
        this.findCategories(this.data.operation);
        this.findBankAccounts();
        this.findPaymentMethods();
    }

    close(): void {
        this.dialog.close();
    }

    submit(): void {
        if(isFormInvalid(this.formGroup)) {
            this.toastService.invalidForm();
            return;
        }

        const transaction = this.formGroup.getRawValue() as unknown as BankAccountTransaction;

        if(transaction.bankAccountTransactionId) {
            this.update(transaction.bankAccountTransactionId, transaction);
        } else {
            this.create(transaction)
        }
    }

    createNewBankAccount(name: string) {
        const dialogRef = this.modalService.open(BankAccountModalComponent, { data: { name } });
        dialogRef.afterClosed().subscribe(() => {

        });
    }

    createNewCategory(name: string) {
        const dialogRef = this.modalService.open(CategoryModalComponent, { data: { name } });
        dialogRef.afterClosed().subscribe(() => {
            
        });
    }

    changeOperation(operation: Operation) {
        this.formGroup.get("operation")?.patchValue(operation);
        this.data.operation = operation;
        this.findCategories(operation);
    }

    changeType(event: Event, type: TransactionType) {
        const checking = (event.target as HTMLInputElement)?.checked
        if(!checking) return this.formGroup.get("type")?.patchValue(TransactionType.SINGLE);

        this.formGroup.get("type")?.patchValue(type);
        this.data.type = type;
    }

    private findCategories(operation?: Operation): void {
        this.categoryService.find({ operation }).subscribe({
            next: (result) => this.categories = result,
            error: e => this.toastService.error(e, "Erro ao obter categorias.")
        });
    }

    private findBankAccounts(): void {
        this.bankAccountService.find().subscribe({
            next: (result) => this.bankAccounts = result,
            error: e => this.toastService.error(e, "Erro ao obter contas bancárias.")
        });
    }

    private findPaymentMethods(): void {
        this.paymentMethodService.find().subscribe({
            next: (result) => this.paymentMethods = result,
            error: e => this.toastService.error(e, "Erro ao obter métodos de pagamento.")
        });
    }

    private get(id: number) {
        console.log(id)
    }

    private create(transaction: BankAccountTransaction) {
        this.bankAccountTransactionService.create(transaction).subscribe({
            next: () => {
                this.toastService.success("Transação criada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao criar transação.")
        });
    }

    private update(id: number, transaction: BankAccountTransaction) {
        this.bankAccountTransactionService.update(id, transaction).subscribe({
            next: () => {
                this.toastService.success("Transação atualizada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao atualizar transação.")
        });
    }
}
