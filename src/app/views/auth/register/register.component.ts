import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@services/api/auth.service";
import { LoadingService } from "@services/loading.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/form-validator";
import { User } from "src/app/models/user";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";

@Component({
    selector: "register",
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule, RouterLink],
    templateUrl: "./register.component.html"
})
export class RegisterComponent {
    formGroup = new FormGroup({
        email: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        name: new FormControl("", [Validators.required]),
        cpf: new FormControl("", [Validators.required]),
    });

    public loadingService = inject(LoadingService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private toastService = inject(ToastService);

    onSubmit(): void {
        if(isFormInvalid(this.formGroup)) {
            this.toastService.invalidForm();
            return;
        }
                
        this.authService.register({...this.formGroup.value, cpf: (this.formGroup.value.cpf as string).replace(/\D/g, "") } as User)
            .subscribe({
                next: () => this.router.navigate(["/dashboard"]),
                error: e => this.toastService.error(e, "Erro ao realizar cadastro."),
            });
    }

}
