import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const token = localStorage.getItem("token");
    
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
        return next(cloned);
    } else {
        return next(req);
    }
}