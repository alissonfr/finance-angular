import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "fin-date-picker",
    standalone: true,
    imports: [CommonModule, MatIconModule, MatDatepickerModule],
    templateUrl: "./fin-date-picker.component.html"
})
export class FinDatePickerComponent {
  @Input({ required: true }) formControlName: string;
}
