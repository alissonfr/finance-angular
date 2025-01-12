import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { IncomeDTO } from "src/app/models/financial-report";

@Component({
    selector: "incomes-card",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./incomes-card.component.html",
})
export class IncomesCardComponent {
    @Input() incomesReport: IncomeDTO;
}
