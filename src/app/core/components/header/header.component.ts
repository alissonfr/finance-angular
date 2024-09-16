import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ThemeSwitcher } from "@utils/theme-switcher";

@Component({
    selector: "header-component",
    standalone: true,
    imports: [CommonModule, MatIconModule, MatMenuModule],
    templateUrl: "./header.component.html"
})
export class HeaderComponent {
    constructor (
      public themeSwitcher: ThemeSwitcher
    ) {}
  
    public change() {
        const currentTheme = this.themeSwitcher.theme.getValue();
        this.themeSwitcher.changeTo(currentTheme === "light" ? "dark" : "light");
    }
}
