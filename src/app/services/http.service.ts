/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "./loading.service";

@Injectable({
    providedIn: "root",
})
export class HttpService {
    private http = inject(HttpClient);
    private loadingService = inject(LoadingService);

    get<T>(url: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
        this.loadingService.start();
        return this.http.get<T>(url, options).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    post<T>(url: string, body: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
        this.loadingService.start();
        return this.http.post<T>(url, body, options).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    put<T>(url: string, body: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
        this.loadingService.start();
        return this.http.put<T>(url, body, options).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    delete<T>(url: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
        this.loadingService.start();
        return this.http.delete<T>(url, options).pipe(
            finalize(() => this.loadingService.end())
        );
    }
}
