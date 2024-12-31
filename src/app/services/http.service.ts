import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "./loading.service";

type AnyLikeObject = object

@Injectable({
    providedIn: "root",
})
export class HttpService {
    private http = inject(HttpClient);
    private loadingService = inject(LoadingService);

    get<T>(url: string, params?: AnyLikeObject): Observable<T> {
        this.loadingService.start();
        return this.http.get<T>(this.getUrlWithParams(url, params),).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    post<T>(url: string, body: AnyLikeObject, params?: AnyLikeObject): Observable<T> {
        this.loadingService.start();
        return this.http.post<T>(this.getUrlWithParams(url, params), body).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    put<T>(url: string, body: AnyLikeObject, params?: AnyLikeObject): Observable<T> {
        this.loadingService.start();
        return this.http.put<T>(this.getUrlWithParams(url, params), body).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    delete<T>(url: string, params?: AnyLikeObject): Observable<T> {
        this.loadingService.start();
        return this.http.delete<T>(this.getUrlWithParams(url, params)).pipe(
            finalize(() => this.loadingService.end())
        );
    }

    private getUrlWithParams(url: string, params?: AnyLikeObject) {
        if(!params) return url;

        const paramsString = Object.entries(params).reduce((acc, [key, value]) => {
            if(value) {
                if(!acc) return acc = `?${key}=${value}`;
                acc = acc + `&${key}=${value}`;
            }
            return acc;
        }, "")

        return `${url}${paramsString}`
    }
}
