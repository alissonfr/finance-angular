import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from "@angular/router";
import { AuthService } from "@services/api/auth.service";
import { ThemeSwitcher } from "@utils/theme-switcher";

@Component({
    selector: "header-component",
    standalone: true,
    imports: [CommonModule, MatIconModule, MatMenuModule],
    templateUrl: "./header.component.html"
})
export class HeaderComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    
    constructor (
      public themeSwitcher: ThemeSwitcher
    ) {}
  
    public change() {
        const currentTheme = this.themeSwitcher.theme();
        this.themeSwitcher.changeTo(currentTheme === "light" ? "dark" : "light");
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }

}
