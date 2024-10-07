import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ModalAddComponent } from "../modal-add/modal-add.component";

@Component({
    selector: "add-button",
    standalone: true,
    imports: [CommonModule, MatIconModule, MatTooltipModule, MatDialogModule],
    templateUrl: "./add-button.component.html",
})
export class AddButtonComponent {

    constructor(
        private dialog: MatDialog
    ) {}

    open() {
        const dialogRef = this.dialog.open(ModalAddComponent, {
            data: {},
        });
      
        dialogRef.afterClosed().subscribe(result => {
            console.log("The dialog was closed");
        });
    }
}
