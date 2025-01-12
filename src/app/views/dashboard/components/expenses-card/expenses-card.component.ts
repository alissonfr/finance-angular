import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ExpensesDTO } from "src/app/models/financial-report";

@Component({
    selector: "expenses-card",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./expenses-card.component.html",
})
export class ExpensesCardComponent {
    @Input() expensesReport: ExpensesDTO;
}
