import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DateControlService } from "@services/date-control.service";
import { ChevronComponent } from "./components/chevron/chevron.component";
import { MonthViewComponent } from "./components/month-view/month-view.component";
import { TransacaoCardComponent } from "./components/transacao-card/transacao-card.component";
import { YearViewComponent } from "./components/year-view/year-view.component";

@Component({
    selector: "transacoes",
    standalone: true,
    imports: [CommonModule, MatIconModule, ChevronComponent, TransacaoCardComponent, MonthViewComponent, YearViewComponent],
    templateUrl: "./transacoes.component.html",
    styleUrl: "./transacoes.component.scss"
}) 
export class TransacoesComponent {
    constructor(
        public dateControlService: DateControlService
    ) {}
}
