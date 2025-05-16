import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "fin-delete-modal",
    imports: [CommonModule, FinFormsModule, MatIconModule],
    templateUrl: "./fin-delete-modal.component.html",
    styleUrl: "./fin-delete-modal.component.scss"
})
export class FinDeleteModalComponent {
    private readonly dialog = inject(MatDialogRef<FinDeleteModalComponent>);
    protected readonly data = inject(MAT_DIALOG_DATA);

    close(): void {
        this.dialog.close(false);
    }

    confirm(): void {
        this.dialog.close(true);
    }
}
