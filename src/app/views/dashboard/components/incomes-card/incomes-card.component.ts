import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "incomes-card",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./incomes-card.component.html",
})
export class IncomesCardComponent {}
