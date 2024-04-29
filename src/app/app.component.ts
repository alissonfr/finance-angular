import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidenavComponent } from "./core/components/sidenav/sidenav.component";
import { ThemeSwitcher } from "./utils/theme-switcher";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidenavComponent],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    constructor(
        private _themeSwitcher: ThemeSwitcher
    ) { }
  
    ngOnInit(): void {
        this._themeSwitcher.load();
    }
}
