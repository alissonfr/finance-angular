import { Injectable, effect, signal } from "@angular/core";

type Theme = "light" | "dark";

@Injectable({
    providedIn: "root"
})
export class ThemeSwitcher {
    public theme = signal<Theme>("light");
    
    constructor() {
        effect(() => this.handleTheme(this.theme()));
    }

    load() {
        this.theme.set("light");
    }

    changeTo(theme: Theme) {
        this.theme.set(theme);
    }

    private handleTheme(theme: Theme) {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            return;
        }
        
        document.documentElement.classList.add("dark");
    }
}
