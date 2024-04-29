import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SidenavItem } from "@interfaces/sidenav-item.interface";
import { HeaderComponent } from "../header/header.component";
import { SidenavItems } from "./sidenav-items";

@Component({
    selector: "sidenav-component",
    standalone: true,
    imports: [CommonModule, MatIconModule, MatSidenavModule, HeaderComponent, MatListModule, RouterLink, RouterLinkActive],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss"
})
export class SidenavComponent {
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    isMobile = true;
    isCollapsed = true;
    items: SidenavItem[] = SidenavItems;
  
    constructor (private _breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
        this._watchBreakpoint();
    }

    toggleMenu() {
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
