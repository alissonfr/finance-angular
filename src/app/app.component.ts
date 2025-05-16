import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterOutlet } from "@angular/router";
import { FinToastComponent } from "@core/components/fin-toast/fin-toast.component";
import { ThemeSwitcher } from "@utils/theme-switcher";

@Component({
    selector: "app-root",
    imports: [CommonModule, RouterOutlet, FinToastComponent, MatSnackBarModule],
    template: `
        <router-outlet /> 
        <fin-toast />
    `
})
export class AppComponent {
    readonly themeSwitcher = inject(ThemeSwitcher)
}
