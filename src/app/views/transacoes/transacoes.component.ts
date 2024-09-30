import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { CheckboxComponent } from "@core/components/checkbox/checkbox.component";
import { TableSorterComponent } from "@core/components/table-sorter/table-sorter.component";
import { FinTableModule } from "@core/finance-table/fin-table.module";
import { TransactionService } from "@services/api/transaction.service";
import { DateControlService } from "@services/date-control.service";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { AddButtonComponent } from "./components/add-button/add-button.component";
import { ChevronComponent } from "./components/chevron/chevron.component";
import { MonthViewComponent } from "./components/month-view/month-view.component";
import { TransacaoCardComponent } from "./components/transacao-card/transacao-card.component";
import { YearViewComponent } from "./components/year-view/year-view.component";

const components = [
    TransacaoCardComponent, 
    MonthViewComponent, 
    YearViewComponent, 
    AddButtonComponent,
    ChevronComponent,
    CheckboxComponent,
    TableSorterComponent
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
        this.transactionService.getTransactions().subscribe(result => this.transactions = result);
    }
}
