import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const token = localStorage.getItem("token");
    const router = inject(Router);
    const clonedRequest = token
        ? req.clone({ headers: req.headers.set("Authorization", `Bearer ${token}`) })
        : req;

    return next(clonedRequest).pipe(
        catchError((error) => {
            if (error.status === 401) {
                router.navigate(["/login"]);
            }
            return throwError(() => error);
        })
    );
};