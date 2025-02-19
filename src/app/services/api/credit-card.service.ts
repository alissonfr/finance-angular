import { inject, Injectable } from "@angular/core";
import { DateControlService } from "@services/date-control.service";
import { HttpService } from "@services/http.service";
import { Observable, Subject } from "rxjs";
import { environment } from "src/app/environment";
import { CreditCard } from "src/app/models/credit-card";
import { CreditCardWithTransactions } from "src/app/models/credit-card-with-transactions";

@Injectable({ 
    providedIn: "root" 
})
export class CreditCardService {
    private readonly PATH = `${environment.API_URL}v1/credit-cards`;
    private http = inject(HttpService);

    private dateControlService = inject(DateControlService);

    private transactionUpdatedSubject = new Subject<void>();
    transactionUpdated$ = this.transactionUpdatedSubject.asObservable();

    constructor() {
        this.dateControlService.dateChanged.subscribe(() => {
            this.notifyTransactionUpdated();
        });
    }

    find(params?: Record<string, string | number | null | undefined>): Observable<CreditCard[]> {
        return this.http.get<CreditCard[]>(this.PATH, params);
    }

    findWithTransactions(params?: Record<string, string | number | null | undefined>): Observable<CreditCardWithTransactions[]> {
        return this.http
            .get<CreditCardWithTransactions[]>(`${this.PATH}/transactions`, { ...params, month: this.dateControlService.monthIndex.value + 1, year: this.dateControlService.year.value })
    }

    get(id: number): Observable<CreditCard> {
        return this.http.get<CreditCard>(`${this.PATH}/${id}`);
    }

    create(bankAccount: Partial<CreditCard>): Observable<CreditCard> {
        return this.http.post<CreditCard>(this.PATH, bankAccount);
    }

    update(id: number, bankAccount: Partial<CreditCard>): Observable<CreditCard> {
        return this.http.put<CreditCard>(`${this.PATH}/${id}`, bankAccount); 
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.PATH}/${id}`);
    }

    private notifyTransactionUpdated(): void {
        this.transactionUpdatedSubject.next();
    }
}