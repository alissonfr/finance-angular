import { inject, Injectable } from "@angular/core";
import { DateControlService } from "@services/date-control.service";
import { HttpService } from "@services/http.service";
import { formatDateHourToNow } from "@utils/parsers";
import { finalize, Observable, Subject } from "rxjs";
import { DeleteTransactionOptions } from "src/app/enums/delete-transaction-options.enum";
import { environment } from "src/app/environment";
import { CreditCardTransaction } from "src/app/models/credit-card-transaction";

@Injectable({ 
    providedIn: "root" 
})
export class CreditCardTransactionService {
    private readonly PATH = `${environment.API_URL}v1/credit-card-transactions`;
    private http = inject(HttpService);
    private dateControlService = inject(DateControlService);

    private transactionUpdatedSubject = new Subject<void>();
    transactionUpdated$ = this.transactionUpdatedSubject.asObservable();

    constructor() {
        this.dateControlService.dateChanged.subscribe(() => {
            this.notifyTransactionUpdated();
        });
    }

    find(params?: Record<string, string | number | null | undefined>): Observable<CreditCardTransaction[]> {
        return this.http
            .get<CreditCardTransaction[]>(this.PATH, { ...params, month: this.dateControlService.monthIndex.value + 1, year: this.dateControlService.year.value })
    }

    get(id: number): Observable<CreditCardTransaction> {
        return this.http.get<CreditCardTransaction>(`${this.PATH}/${id}`);
    }

    create(transaction: Partial<CreditCardTransaction>): Observable<CreditCardTransaction> {
        transaction.date = formatDateHourToNow(transaction.date);
        return this.http.post<CreditCardTransaction>(this.PATH, transaction)
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    update(id: number, transaction: Partial<CreditCardTransaction>): Observable<CreditCardTransaction> {
        return this.http.put<CreditCardTransaction>(`${this.PATH}/${id}`, transaction)
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    delete(id: number, option?: DeleteTransactionOptions): Observable<void> {
        return this.http.delete<void>(`${this.PATH}/${id}`, { option })
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    updateStatus(id: number): Observable<CreditCardTransaction> {
        return this.http.put<CreditCardTransaction>(`${this.PATH}/${id}/status`, {})
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    private notifyTransactionUpdated(): void {
        this.transactionUpdatedSubject.next();
    }
}