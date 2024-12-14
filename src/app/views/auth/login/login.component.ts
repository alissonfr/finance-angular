import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { FinFormsModule } from "@core/shared/fin-forms/fin-forms.module";
import { AuthService } from "@services/api/auth.service";
import { LoadingService } from "@services/loading.service";
import { ToastService } from "@services/toast.service";

class LoginRequest {
    email: string;
    password: string;
}

@Component({
    selector: "login",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule, RouterLink],
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    formGroup = new FormGroup({
        email: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
    });

    public loadingService = inject(LoadingService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private toastService = inject(ToastService);

    onSubmit(): void {
        this.authService.login(this.formGroup.value as LoginRequest)
            .subscribe({
                next: () => this.router.navigate(["/dashboard"]),
                error: e => this.toastService.error(JSON.stringify(e?.response?.message) || "Erro ao realizar login."),
            });
    }

}
