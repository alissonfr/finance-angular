import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { ThemeSwitcher } from "@utils/theme-switcher";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";
import { HeaderComponent } from "./components/header/header.component";
import { SidenavItem } from "./sidenav-item.type";
import { SidenavItems } from "./sidenav-items";

const imports = [
    CommonModule, 
    MatIconModule, 
    MatSidenavModule, 
    HeaderComponent, 
    MatListModule, 
    RouterLink, 
    RouterLinkActive, 
    RouterOutlet,
    FinFormsModule,
    MatMenuModule
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

    readonly LOGO_URL = "assets/img/logo-dark.svg"
    readonly DARK_LOGO_URL = "assets/img/logo-light.svg"
    private _breakpointObserver = inject(BreakpointObserver)
    private _router = inject(Router)
    themeSwitcher = inject(ThemeSwitcher)

    ngOnInit(): void {
        this._watchBreakpoint();
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
}
