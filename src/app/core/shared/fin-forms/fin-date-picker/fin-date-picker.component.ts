import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { FinInputComponent } from "../fin-input/fin-input.component";

@Component({
    selector: "fin-date-picker",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatDatepickerModule, FinInputComponent],
    templateUrl: "./fin-date-picker.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FinDatePickerComponent {
  @Input({ required: true }) controlName: string;
}
