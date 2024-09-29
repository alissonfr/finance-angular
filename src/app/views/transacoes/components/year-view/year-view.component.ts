import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { MONTHS } from "src/app/constants/date.constants";
import { ChevronComponent } from "../chevron/chevron.component";


@Component({
    selector: "year-view",
    standalone: true,
    imports: [CommonModule, MatIconModule, ChevronComponent],
    templateUrl: "./year-view.component.html",
    styleUrl: "./year-view.component.scss"
}) 
export class YearViewComponent {
    readonly months: string[] = MONTHS;

    constructor(
        public dateControl: DateControlService
    ) {}

}
