import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { BankAccount } from "src/app/models/bank-account";

@Injectable({ 
    providedIn: "root" 
})
export class BankAccountService {
    private readonly PATH = `${environment.API_URL}v1/account`;
    private http = inject(HttpClient)

    find(): Observable<BankAccount[]> {
        return this.http.get<BankAccount[]>(this.PATH);
    }

    get(id: number): Observable<BankAccount> {
        return this.http.get<BankAccount>(`${this.PATH}/${id}`);
    }
}