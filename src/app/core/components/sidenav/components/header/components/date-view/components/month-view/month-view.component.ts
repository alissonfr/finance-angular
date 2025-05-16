import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { MAXIMUM_YEAR } from "src/app/constants/date.constants";
import { ChevronComponent } from "../chevron/chevron.component";

@Component({
    selector: "month-view",
    imports: [CommonModule, MatIconModule, ChevronComponent],
    templateUrl: "./month-view.component.html"
}) 
export class MonthViewComponent {
    dateControl = inject(DateControlService);
    showNextMonth: boolean = true;

    ngOnInit() {
        this.verifyMonth();
    }

    verifyMonth() {
        this.dateControl.monthIndex.subscribe((month) => {
            const year = this.dateControl.year.value;
            const now = new Date();
            const maxDate = new Date(now.getFullYear() + MAXIMUM_YEAR, now.getMonth());
    
            const selectedDate = new Date(year, month);
            
            this.showNextMonth = selectedDate < maxDate;
        })
    }
}
