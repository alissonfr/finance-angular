import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { TransactionDTO } from "src/app/dtos/transaction/transaction.dto";
import { Transaction } from "src/app/models/transaction";

@Injectable({ 
    providedIn: "root" 
})
export class TransactionService {
    private readonly PATH = "v1/transaction";

    constructor(
        // private http: HttpClient
    ) {}

    getTransactions(): Observable<TransactionDTO[]> {
        return of(transactions).pipe(map(transactions => transactions.map(transaction => ({ ...transaction, selected: false }))));
    }
}

const transactions: Transaction[] = [
    {
        transactionId: 1,
        date: "29/03/2003",
        description: "Compras no atacadao",
        category: "Supermercado",
        account: "Itau",
        amount: "19.90",
    },
    {
        transactionId: 2,
        date: "29/03/2003",
        description: "Compras no atacadao",
        category: "Supermercado",
        account: "Itau",
        amount: "19.90",
    },
    {
        transactionId: 3,
        date: "29/03/2003",
        description: "Compras no atacadao",
        category: "Supermercado",
        account: "Itau",
        amount: "19.90",
    },
]