import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FinCheckboxComponent } from "../../../../core/shared/fin-table_old/components/fin-checkbox/fin-checkbox.component";

@Component({
    selector: "transactions-card",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinCheckboxComponent, MatTooltipModule],
    templateUrl: "./transactions-card.component.html",
    styleUrl: "./transactions-card.component.scss",
})
export class TransactionCardComponent {
}
