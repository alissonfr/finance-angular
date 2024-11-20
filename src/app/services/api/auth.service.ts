import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/app/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly PATH = `${environment.API_URL}v1/auth`;

    constructor(
        private http: HttpClient
    ) {}

    signup(data: unknown) {
        return this.http.post(`${this.PATH}/register`, data);
    }

    login(data: unknown): Observable<unknown> {
        return this.http.post(`${this.PATH}/login`, data)
            .pipe(tap((result) => localStorage.setItem("user", JSON.stringify(result))));
    }

    logout() {
        localStorage.removeItem("user");
    }

    isLoggedIn() {
        return localStorage.getItem("user") !== null;
    }
}