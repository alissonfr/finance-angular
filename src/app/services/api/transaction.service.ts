import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateControlService } from "@services/date-control.service";
import { map, Observable, switchMap } from "rxjs";
import { CreateTransactionDTO } from "src/app/dtos/transaction/create-transaction.dto";
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

    find(): Observable<TransactionDTO[]> {
        return this.dateControlService.year.pipe(
            switchMap(year => this.dateControlService.monthIndex.pipe(map(monthIndex => ({ year, month: monthIndex + 1 })))),
            switchMap(({ year, month }) => this.http
                .get<Transaction[]>(`${this.PATH}?year=${year}&month=${month}`)
                .pipe(
                    map(transactions =>
                        transactions.map(transaction => ({
                            ...transaction,
                            selected: false as const,
                        }))
                    )
                )
            )
        );
    }

    create(transaction: CreateTransactionDTO): Observable<Transaction> {
        return this.http.post<Transaction>(this.PATH, transaction);
    }
}