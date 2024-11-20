import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@services/api/auth.service";
import { ToastService } from "@services/toast.service";

@Component({
    selector: "auth",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    formGroup = new FormGroup({
        email: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    });

    private authService = inject(AuthService);
    private router = inject(Router);
    private toastService = inject(ToastService);

    onSubmit(){
        this.authService.login(this.formGroup.value)
            .subscribe({
                next: () => {
                    if(this.authService.isLoggedIn()){
                        this.router.navigate(["/dashboard"]);
                    }
                },
                error: () => this.toastService.error("Erro ao realizar login.")
            });
    }

}
