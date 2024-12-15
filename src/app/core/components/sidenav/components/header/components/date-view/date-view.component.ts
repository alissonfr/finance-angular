import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { MonthViewComponent } from "./components/month-view/month-view.component";
import { YearViewComponent } from "./components/year-view/year-view.component";

const components = [
    MonthViewComponent, 
    YearViewComponent, 
]

@Component({
    selector: "date-view",
    standalone: true,
    imports: [CommonModule, MatIconModule, ...components],
    templateUrl: "./date-view.component.html",
}) 
export class DateViewComponent {
    dateControlService = inject(DateControlService)
}
