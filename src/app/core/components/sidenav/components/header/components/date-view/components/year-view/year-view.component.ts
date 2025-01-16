import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { MAXIMUM_YEAR, MONTHS } from "src/app/constants/date.constants";
import { ChevronComponent } from "../chevron/chevron.component";

@Component({
    selector: "year-view",
    standalone: true,
    imports: [CommonModule, MatIconModule, ChevronComponent],
    templateUrl: "./year-view.component.html",
    styleUrl: "./year-view.component.scss"
}) 
export class YearViewComponent {
    readonly dateControl = inject(DateControlService)
    readonly months: string[] = MONTHS;
    showNextYear: boolean = true;
    currentMonth = new Date().getMonth() + 1;

    ngOnInit() {
        this.verifyYear();
    }

    verifyYear() {
        this.dateControl.year.subscribe(year => {
            const currentYear = new Date().getFullYear();
            const maxYear = currentYear + MAXIMUM_YEAR;
            this.showNextYear = year < maxYear
        })
    }

}
