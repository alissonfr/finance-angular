import { inject, Injectable } from "@angular/core";
import { HttpService } from "@services/http.service";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { PaymentMethod } from "src/app/models/payment-method";

@Injectable({ 
    providedIn: "root" 
})
export class PaymentMethodService {
    private readonly PATH = `${environment.API_URL}v1/payment-methods`;
    private http = inject(HttpService)

    find(): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethod[]>(this.PATH);
    }

    get(id: number): Observable<PaymentMethod> {
        return this.http.get<PaymentMethod>(`${this.PATH}/${id}`);
    }
}