import { Injectable, effect, signal } from "@angular/core";

type Theme = "light" | "dark";

@Injectable({
    providedIn: "root"
})
export class ThemeSwitcher {
    theme = signal<Theme>("dark");
    
    constructor() {
        const storage = localStorage.getItem("theme")
        if(storage) {
            this.theme.set(storage as Theme);
        }
        effect(() => this.handleTheme(this.theme()));
    }

    changeTo(theme: Theme) {
        this.theme.set(theme);
        localStorage.setItem("theme", theme);
    }

    private handleTheme(theme: Theme) {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            return;
        }
        
        document.documentElement.classList.add("dark");
    }
}
