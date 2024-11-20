import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, } from "rxjs";
import { TransactionCategoryDTO } from "src/app/dtos/transaction-category/transaction-category.dto";
import { environment } from "src/app/environment";
import { TransactionCategory } from "src/app/models/transaction-category";

@Injectable({ 
    providedIn: "root" 
})
export class TransactionCategoryService {
    private readonly PATH = `${environment.API_URL}v1/transaction-category`;

    constructor(
        private http: HttpClient
    ) {}

    find(): Observable<TransactionCategoryDTO[]> {
        return this.http.get<TransactionCategory[]>(this.PATH).pipe(map(categories => categories.map(category => ({ ...category, selected: false }))));
    }
}