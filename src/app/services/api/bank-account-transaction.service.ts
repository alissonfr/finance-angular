import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { BankAccountTransaction } from "src/app/models/bank-account-transaction";

@Injectable({ 
    providedIn: "root" 
})
export class BankAccountTransactionService {
    private readonly PATH = `${environment.API_URL}v1/bank-account/transaction`;
    private http = inject(HttpClient)

    find(): Observable<BankAccountTransaction[]> {
        return this.http.get<BankAccountTransaction[]>(this.PATH);
    }
}