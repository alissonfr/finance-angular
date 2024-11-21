import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateControlService } from "@services/date-control.service";
import { map, Observable, switchMap } from "rxjs";
import { CreateTransactionDTO } from "src/app/dtos/transaction/create-transaction.dto";
import { GroupedTransactions } from "src/app/dtos/transaction/grouped-transactions.dto";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { environment } from "src/app/environment";
import { Transaction } from "src/app/models/transaction";

@Injectable({ 
    providedIn: "root" 
})
export class TransactionService {
    private readonly PATH = `${environment.API_URL}v1/transaction`;

    constructor(
        private http: HttpClient,
        private dateControlService: DateControlService,
    ) {}

    find(page: number = 1, limit: number = 9999): Observable<TransactionDTO[]> {
        return this.dateControlService.year.pipe(
            switchMap(year => this.dateControlService.monthIndex.pipe(map(monthIndex => ({ year, month: monthIndex + 1 })))),
            switchMap(({ year, month }) => this.http
                .get<Transaction[]>(`${this.PATH}?year=${year}&month=${month}&page=${page}&limit=${limit}`)
                .pipe(
                    map(transactions =>
                        transactions.map(transaction => ({
                            ...transaction,
                            selected: false,
                        }))
                    )
                )
            )
        );
    }

    findGrouped(page: number = 1, limit: number = 9999): Observable<GroupedTransactions> {
        return this.dateControlService.year.pipe(
            switchMap(year => this.dateControlService.monthIndex.pipe(map(monthIndex => ({ year, month: monthIndex + 1 })))),
            switchMap(({ year, month }) => this.http.get<GroupedTransactions>(`${this.PATH}/grouped?year=${year}&month=${month}&page=${page}&limit=${limit}`)
            )
        );
    }

    create(transaction: CreateTransactionDTO): Observable<Transaction> {
        return this.http.post<Transaction>(this.PATH, transaction);
    }
}