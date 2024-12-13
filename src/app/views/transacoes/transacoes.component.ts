import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { FinTableComponent } from "../../core/shared/fin-table/fin-table.component";
import { AddButtonComponent } from "./components/add-button/add-button.component";
import { MonthViewComponent } from "./components/month-view/month-view.component";
import { YearViewComponent } from "./components/year-view/year-view.component";

const components = [
    MonthViewComponent, 
    YearViewComponent, 
    AddButtonComponent,
]

@Component({
    selector: "transacoes",
    standalone: true,
    imports: [CommonModule, MatIconModule, ...components, FinTableComponent],
    templateUrl: "./transacoes.component.html",
    styleUrl: "./transacoes.component.scss"
}) 
export class TransacoesComponent {
    public dateControlService = inject(DateControlService)
}
