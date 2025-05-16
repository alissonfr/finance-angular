import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BalanceReportDTO } from "src/app/models/financial-report";

@Component({
    selector: "balance-card",
    imports: [CommonModule],
    templateUrl: "./balance-card.component.html"
})
export class BalanceCardComponent {
    @Input() balanceReport: BalanceReportDTO;

    isExpense(percentageChange: number): boolean {
        return percentageChange < 0;
    }
}
