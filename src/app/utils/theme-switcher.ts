import { Injectable, afterNextRender } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type Theme = "light" | "dark";

@Injectable({
    providedIn: "root"
})
export class ThemeSwitcher {
    public theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>("light");

    constructor() {
        afterNextRender(() => {
            this.theme.subscribe((theme) => this.handleTheme(theme));
        });
    }

    load() {
        this.theme.next("light");
    }

    changeTo(theme: Theme) {
        this.theme.next(theme);
    }

    private handleTheme(theme: Theme) {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            return;
        }
        
        document.documentElement.classList.add("dark");
    }
}
