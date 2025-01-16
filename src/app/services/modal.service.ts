import { ComponentType } from "@angular/cdk/portal";
import { Injectable, inject } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { FinDeleteModalComponent } from "@core/components/fin-modal/delete-modal/fin-delete-modal.component";
import { FinDeleteTransactionModalComponent } from "@core/components/fin-modal/delete-transaction-modal/fin-delete-transaction-modal.component";
import { BankAccountTransaction } from "../models/bank-account-transaction";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    private readonly dialog = inject(MatDialog);


    open<T, R = unknown>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T, R> {
        return this.dialog.open(component, { minWidth: "40%", ...config });
    }

    confirm(data: { title: string, message: string }) {
        return this.open(FinDeleteModalComponent, { width: "400px", height: "300px", data: { ...data }, maxWidth: "400px" });
    }

    deleteTransaction(transaction: BankAccountTransaction) {
        return this.open(FinDeleteTransactionModalComponent, { width: "500px", height: "450px", data: { transaction }, maxWidth: "500px" });
    }

    closeAll(): void {
        this.dialog.closeAll();
    }
}
