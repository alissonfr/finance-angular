import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidenavComponent } from "./core/components/sidenav/sidenav.component";
import { ThemeSwitcher } from "./utils/theme-switcher";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidenavComponent],
    template: "<router-outlet />",
})
export class AppComponent {
    private _themeSwitcher = inject(ThemeSwitcher)
  
    ngOnInit(): void {
        this._themeSwitcher.load();
    }
}
