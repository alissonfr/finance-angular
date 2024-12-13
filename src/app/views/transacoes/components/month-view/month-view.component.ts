import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { ChevronComponent } from "../chevron/chevron.component";

@Component({
    selector: "month-view",
    standalone: true,
    imports: [CommonModule, MatIconModule, ChevronComponent],
    templateUrl: "./month-view.component.html",
    styleUrl: "./month-view.component.scss"
}) 
export class MonthViewComponent {
    dateControl = inject(DateControlService)
}
