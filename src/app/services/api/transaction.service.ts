import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, } from "rxjs";
import { CreateTransactionDTO } from "src/app/dtos/transaction/create-transaction.dto";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { API_URL } from "src/app/environment";
import { Transaction } from "src/app/models/transaction";

@Injectable({ 
    providedIn: "root" 
})
export class TransactionService {
    private readonly PATH = `${API_URL}v1/transaction`;

    constructor(
        private http: HttpClient
    ) {}

    find(): Observable<TransactionDTO[]> {
        return this.http.get<Transaction[]>(this.PATH).pipe(map(transactions => transactions.map(transaction => ({ ...transaction, selected: false }))));
    }

    create(transaction: CreateTransactionDTO): Observable<Transaction> {
        return this.http.post<Transaction>(this.PATH, transaction);
    }
}