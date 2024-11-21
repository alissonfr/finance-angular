import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FinCheckboxComponent } from "@core/shared/fin-table/components/fin-checkbox/fin-checkbox.component";
import { TransactionService } from "@services/api/transaction.service";
import { DateControlService } from "@services/date-control.service";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { FinTableComponent } from "../../core/shared/fin-table/fin-table.component";
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
    imports: [CommonModule, MatIconModule, ...components, FinTableComponent],
    templateUrl: "./transacoes.component.html",
    styleUrl: "./transacoes.component.scss"
}) 
export class TransacoesComponent {
    transactions: TransactionDTO[] = [];

    columns: string[] = ["date", "description", "category.name", "account.name"];
    displayColumns: string[] = ["Data", "Descrição", "Categoria", "Conta"];

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

    handleSelectionChange(selectedRows: unknown[]) {
        console.log("Linhas selecionadas:", selectedRows);
    }
}
