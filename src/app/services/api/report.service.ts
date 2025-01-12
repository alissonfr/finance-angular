import { inject, Injectable } from "@angular/core";
import { HttpService } from "@services/http.service";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { FinancialReportDTO } from "src/app/models/financial-report";

@Injectable({ 
    providedIn: "root" 
})
export class ReportService {
    private readonly PATH = `${environment.API_URL}v1/reports`;
    private http = inject(HttpService);

    getFinancialReport(): Observable<FinancialReportDTO> {
        return this.http.get<FinancialReportDTO>(this.PATH, { month: "01", year: "2025" });
    }
}