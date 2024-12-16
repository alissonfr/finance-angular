import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FinFormsModule } from "../../fin-forms/fin-forms.module";

@Component({
    selector: "page-header",
    standalone: true,
    imports: [MatIconModule, FinFormsModule],
    templateUrl: "./page-header.component.html",
    styleUrl: "./page-header.component.scss",
})
export class PageHeaderComponent {
    @Input({ required: true }) title: string;
    @Input({ required: true }) icon: string;
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() newClick = new EventEmitter<void>();

    handleClick(): void {
        this.newClick.emit();
    }
}
