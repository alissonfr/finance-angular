import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { DeleteTransactionOptions } from "src/app/enums/delete-transaction-options.enum";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "fin-delete-transaction-modal",
    standalone: true,
    imports: [CommonModule, FinFormsModule, MatIconModule],
    templateUrl: "./fin-delete-transaction-modal.component.html",
    styleUrl: "./fin-delete-transaction-modal.component.scss"
})
export class FinDeleteTransactionModalComponent {
    private readonly dialog = inject(MatDialogRef<FinDeleteTransactionModalComponent>);
    protected readonly data = inject(MAT_DIALOG_DATA);

    option = DeleteTransactionOptions.CURRENT;

    get options() {
        return DeleteTransactionOptions;
    }

    close(): void {
        this.dialog.close(false);
    }

    confirm(): void {
        this.dialog.close(this.option);
    }

    changeOption(option: DeleteTransactionOptions) {
        this.option = option;
    }
}
