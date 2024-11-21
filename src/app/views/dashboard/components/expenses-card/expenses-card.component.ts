import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "expenses-card",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./expenses-card.component.html",
})
export class ExpensesCardComponent {}
