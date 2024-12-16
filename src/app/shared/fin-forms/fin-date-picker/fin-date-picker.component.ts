import { CommonModule, formatDate } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { firstValueFrom } from "rxjs";
import { FinInputComponent } from "../fin-input/fin-input.component";

@Component({
    selector: "fin-date-picker",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatDatepickerModule, FinInputComponent],
    templateUrl: "./fin-date-picker.component.html",
    styleUrl: "./fin-date-picker.component.scss",
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FinDatePickerComponent {
  @Input({ required: true }) control: string;
  initialValue: string;

  private readonly dateControlService = inject(DateControlService)

  async ngOnInit() {
      this.initialValue = await this.initDateInput();
  }

  async initDateInput(): Promise<string> {
      const date = new Date();
      date.setFullYear(await firstValueFrom(this.dateControlService.year));
      date.setMonth(await firstValueFrom(this.dateControlService.monthIndex));
      
      return formatDate(date, "dd/MM/yyyy", "pt-BR")
  }
}
