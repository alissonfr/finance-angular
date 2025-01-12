import { inject, Injectable } from "@angular/core";
import { HttpService } from "@services/http.service";
import { formatDateHourToNow } from "@utils/parsers";
import { finalize, Observable, Subject } from "rxjs";
import { environment } from "src/app/environment";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";

@Injectable({ 
    providedIn: "root" 
})
export class BankAccountTransactionService {
    private readonly PATH = `${environment.API_URL}v1/bank-account-transactions`;
    private http = inject(HttpService);

    private transactionUpdatedSubject = new Subject<void>();
    transactionUpdated$ = this.transactionUpdatedSubject.asObservable();

    find(params?: Record<string, string | number | null | undefined>): Observable<BankAccountTransaction[]> {
        return this.http.get<BankAccountTransaction[]>(this.PATH, params);
    }

    get(id: number): Observable<BankAccountTransaction> {
        return this.http.get<BankAccountTransaction>(`${this.PATH}/${id}`);
    }

    create(transaction: Partial<BankAccountTransaction>): Observable<BankAccountTransaction> {
        transaction.date = formatDateHourToNow(transaction.date);
        return this.http.post<BankAccountTransaction>(this.PATH, transaction)
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    update(id: number, transaction: Partial<BankAccountTransaction>): Observable<BankAccountTransaction> {
        return this.http.put<BankAccountTransaction>(`${this.PATH}/${id}`, transaction)
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.PATH}/${id}`)
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    updateStatus(id: number): Observable<BankAccountTransaction> {
        return this.http.put<BankAccountTransaction>(`${this.PATH}/${id}/status`, {})
            .pipe(finalize(() => this.notifyTransactionUpdated()));
    }

    private notifyTransactionUpdated(): void {
        this.transactionUpdatedSubject.next();
    }
}