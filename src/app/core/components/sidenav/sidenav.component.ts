import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { SidenavItem } from "@core/components/sidenav/sidenav-item.type";
import { ThemeSwitcher } from "@utils/theme-switcher";
import { HeaderComponent } from "../header/header.component";
import { SidenavItems } from "./sidenav-items";

const imports = [
    CommonModule, 
    MatIconModule, 
    MatSidenavModule, 
    HeaderComponent, 
    MatListModule, 
    RouterLink, 
    RouterLinkActive, 
    RouterOutlet
]

@Component({
    selector: "sidenav-component",
    standalone: true,
    imports: [...imports],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss"
})
export class SidenavComponent {
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    isMobile = true;
    isCollapsed = true;
    items: SidenavItem[] = SidenavItems;

    private readonly LOGO_URL = "./assets/img/logo-dark.svg"
    private readonly DARK_LOGO_URL = "./assets/img/logo-light.svg"
    logo: string = this.LOGO_URL;
  
    constructor (
        private _breakpointObserver: BreakpointObserver,
        private _router: Router,
        private _themeSwitcher: ThemeSwitcher
    ) {}

    ngOnInit(): void {
        this._watchBreakpoint();
        this._watchTheme();
    }

    isCurrentRoute(route: string): boolean {
        return this._router.url === route;
    }

    toggleMenu(): void {
        if(this.isMobile){
            this.sidenav.toggle();
            this.isCollapsed = false;
        } else {
            this.sidenav.open();
            this.isCollapsed = !this.isCollapsed;
        }
    }

    private _watchBreakpoint(): void {
        this._breakpointObserver.observe(["(max-width: 800px)"]).subscribe((screenSize: BreakpointState) => this.isMobile = screenSize.matches);
    }

    private _watchTheme(): void {
        this._themeSwitcher.theme.subscribe(theme => theme === "dark" ? this.DARK_LOGO_URL : this.LOGO_URL)
    }
}
