import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { CategoryService } from "@services/api/category.service";
import { CreditCardTransactionService } from "@services/api/credit-card-transaction.service";
import { CreditCardService } from "@services/api/credit-card.service";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/form-validator";
import { CategoryModalComponent } from "@views/categories/components/bank-account-modal/category-modal.component";
import { CreditCardModalComponent } from "@views/credit-cards/components/credit-card-modal/credit-card-modal.component";
import { Operation } from "src/app/enums/operation.enum";
import { TransactionStatus } from "src/app/enums/transaction-status.enum";
import { TransactionType } from "src/app/enums/transaction-type.enum";
import { Category } from "src/app/models/category";
import { CreditCard } from "src/app/models/credit-card";
import { CreditCardTransaction } from "src/app/models/credit-card-transaction";
import { FinFormsModule } from "../../fin-forms/fin-forms.module";
import { FinTransactionModalComponent } from "../fin-transaction-modal/fin-transaction-modal.component";

@Component({
    selector: "fin-cc-transaction-modal",
    standalone: true,
    imports: [CommonModule, FinFormsModule, ReactiveFormsModule, MatIconModule, MatMenuModule, MatDatepickerModule],
    templateUrl: "./fin-cc-transaction-modal.component.html",
    styleUrl: "./fin-cc-transaction-modal.component.scss"
})
export class FinCCTransactionModalComponent {
    expanded: boolean = false;
    operations = Operation;
    types = TransactionType;
    formGroup: FormGroup = new FormGroup({
        creditCardTransactionId: new FormControl(0),
        description: new FormControl("", [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        amount: new FormControl("", [Validators.required]),
        creditCard: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        notes: new FormControl(""),
        type: new FormControl(TransactionType.SINGLE),
    });
    
    creditCards: CreditCard[] = [];
    categories: Category[] = [];

    protected readonly data = inject(MAT_DIALOG_DATA);
    private readonly modalService = inject(ModalService);
    private readonly dialog = inject(MatDialogRef<CategoryModalComponent>);
    private readonly creditCardService = inject(CreditCardService);
    private readonly categoryService = inject(CategoryService);
    private readonly toastService = inject(ToastService);
    private readonly bankAccountTransactionService = inject(CreditCardTransactionService);
    
    ngOnInit() {
        this.findCategories();
        this.findCreditCards();

        if(this.data?.id) this.get(this.data.id);
    }

    close(): void {
        this.dialog.close();
    }

    submit(): void {
        if(isFormInvalid(this.formGroup)) {
            this.toastService.invalidForm();
            return;
        }

        const transaction = this.formGroup.getRawValue() as unknown as CreditCardTransaction;

        if(transaction.creditCardTransactionId) {
            this.update(transaction.creditCardTransactionId, transaction);
        } else {
            this.create(transaction)
        }
    }

    createNewCreditCard(name: string) {
        const dialogRef = this.modalService.open(CreditCardModalComponent, { data: { name } });
        dialogRef.afterClosed().subscribe(() => {

        });
    }

    createNewCategory(name: string) {
        const dialogRef = this.modalService.open(CategoryModalComponent, { data: { name } });
        dialogRef.afterClosed().subscribe(() => {
            
        });
    }

    changeToBankAccount(operation: Operation) {
        this,close();
        const dialogRef = this.modalService.open(FinTransactionModalComponent, { data: { operation } });
        dialogRef.afterClosed().subscribe(() => {});
    }

    changeType(event: Event, type: TransactionType) {
        const checking = (event.target as HTMLInputElement)?.checked
        if(!checking) {
            this.formGroup.removeControl("installments");
            return this.formGroup.get("type")?.patchValue(TransactionType.SINGLE)
        }

        if(type === TransactionType.IN_INSTALLMENTS) {
            this.formGroup.addControl("installments", new FormControl("", Validators.required))
        } else {
            this.formGroup.removeControl("installments");
        }

        this.formGroup.get("type")?.patchValue(type);
    }

    changeStatus() {
        const status = this.formGroup.get("status");
        if(status?.value === TransactionStatus.PAID) {
            status.patchValue(TransactionStatus.PENDING)
        } else {
            status?.patchValue(TransactionStatus.PAID)
        }
    }

    private findCategories(): void {
        this.categoryService.find({ operatio: Operation.EXPENSE }).subscribe({
            next: (result) => this.categories = result,
            error: e => this.toastService.error(e, "Erro ao obter categorias.")
        });
    }

    private findCreditCards(): void {
        this.creditCardService.find().subscribe({
            next: (result) => this.creditCards = result,
            error: e => this.toastService.error(e, "Erro ao obter contas bancárias.")
        });
    }

    private get(id: number) {
        this.bankAccountTransactionService.get(id).subscribe({
            next: (result) => this.formGroup.setValue(result as unknown as never),
            error: e => this.toastService.error(e, "Erro ao obter métodos de pagamento.")
        });
    }

    private create(transaction: CreditCardTransaction) {
        this.bankAccountTransactionService.create(transaction).subscribe({
            next: () => {
                this.toastService.success("Transação criada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao criar transação.")
        });
    }

    private update(id: number, transaction: CreditCardTransaction) {
        this.bankAccountTransactionService.update(id, transaction).subscribe({
            next: () => {
                this.toastService.success("Transação atualizada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao atualizar transação.")
        });
    }
}
