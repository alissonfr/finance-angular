import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, } from "rxjs";
import { AccountDTO } from "src/app/dtos/account/account.dto";
import { environment } from "src/app/environment";
import { Account } from "src/app/models/account";

@Injectable({ 
    providedIn: "root" 
})
export class AccountService {
    private readonly PATH = `${environment.API_URL}v1/account`;

    constructor(
        private http: HttpClient
    ) {}

    find(): Observable<AccountDTO[]> {
        return this.http.get<Account[]>(this.PATH).pipe(map(accounts => accounts.map(account => ({ ...account, selected: false }))));
    }
}