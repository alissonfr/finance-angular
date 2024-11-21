import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FinToastComponent } from "@core/shared/fin-toast/fin-toast.component";
import { ThemeSwitcher } from "./utils/theme-switcher";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, FinToastComponent],
    template: `
        <router-outlet /> 
        <fin-toast />
    `
})
export class AppComponent {
    private _themeSwitcher = inject(ThemeSwitcher)
  
    ngOnInit(): void {
        this._themeSwitcher.load();
    }
}
