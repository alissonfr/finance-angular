import { inject, Injectable } from "@angular/core";
import { HttpService } from "@services/http.service";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { BankAccount } from "src/app/models/bank-account";

@Injectable({ 
    providedIn: "root" 
})
export class BankAccountService {
    private readonly PATH = `${environment.API_URL}v1/bank-accounts`;
    private http = inject(HttpService)

    find(): Observable<BankAccount[]> {
        return this.http.get<BankAccount[]>(this.PATH);
    }

    get(id: number): Observable<BankAccount> {
        return this.http.get<BankAccount>(`${this.PATH}/${id}`);
    }

    create(bankAccount: Partial<BankAccount>): Observable<BankAccount> {
        return this.http.post<BankAccount>(this.PATH, bankAccount);
    }
}