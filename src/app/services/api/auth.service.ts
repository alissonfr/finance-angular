import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoadingService } from "@services/loading.service";
import { finalize, Observable, tap } from "rxjs";
import { environment } from "src/app/environment";
import { User } from "src/app/models/user";

class LoginResponse {
    token: string;
    user: User;
}

class RegisterResponse {
    token: string;
    user: User
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly PATH = `${environment.API_URL}v1/auth`;
    private http = inject(HttpClient);
    private loadingService = inject(LoadingService);

    register(data: User) {
        return this.http.post<RegisterResponse>(`${this.PATH}/register`, data);
    }

    login(data: { email: string, password: string }): Observable<LoginResponse> {
        this.loadingService.start();
        return this.http.post<LoginResponse>(`${this.PATH}/login`, data)
            .pipe(
                tap((result) => {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("user", JSON.stringify(result.user));
                }),
                finalize(() => this.loadingService.end())
            );
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    isLoggedIn() {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!user || !token) {
            return false;
        }
        if (this.isTokenExpired(token)) {
            this.logout();
            return false;
        }
        return true;
    }

    private isTokenExpired(token: string): boolean {
        const expiry = (JSON.parse(atob(token.split(".")[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}