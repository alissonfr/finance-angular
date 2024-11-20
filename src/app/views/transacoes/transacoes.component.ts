import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FinCheckboxComponent } from "@core/table/fin-checkbox/fin-checkbox.component";
import { FinTableModule } from "@core/table/fin-table.module";
import { TransactionService } from "@services/api/transaction.service";
import { DateControlService } from "@services/date-control.service";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { AddButtonComponent } from "./components/add-button/add-button.component";
import { MonthViewComponent } from "./components/month-view/month-view.component";
import { TransacaoCardComponent } from "./components/transacao-card/transacao-card.component";
import { YearViewComponent } from "./components/year-view/year-view.component";

const components = [
    TransacaoCardComponent, 
    MonthViewComponent, 
    YearViewComponent, 
    AddButtonComponent,
    FinCheckboxComponent
]

@Component({
    selector: "transacoes",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinTableModule, ...components],
    templateUrl: "./transacoes.component.html",
    styleUrl: "./transacoes.component.scss"
}) 
export class TransacoesComponent {
    transactions: TransactionDTO[] = [];

    constructor(
        public dateControlService: DateControlService,
        public transactionService: TransactionService
    ) {}

    ngOnInit() {
        this.getTransactions();
    }

    getTransactions() {
        this.transactionService.find().subscribe({
            next: result => this.transactions = result,
            error: e => console.error(e)
        });
    }
}
