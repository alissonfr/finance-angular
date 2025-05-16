import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { ModalService } from "@services/modal.service";
import { ThemeSwitcher } from "@utils/theme-switcher";
import { Operation } from "src/app/enums/operation.enum";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";
import { FinTransactionModalComponent } from "src/app/shared/fin-ui/fin-transaction-modal/fin-transaction-modal.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidenavItem } from "./sidenav-item.type";
import { SidenavItems } from "./sidenav-items";
import { FinCCTransactionModalComponent } from "src/app/shared/fin-ui/fin-cc-transaction-modal/fin-cc-transaction-modal.component";

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
    imports: [...imports],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss"
})
export class SidenavComponent {
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    isMobile = true;
    isCollapsed = true;
    items: SidenavItem[] = SidenavItems;
    operation = Operation;

    readonly LOGO_URL = "assets/img/logo-dark.svg"
    readonly DARK_LOGO_URL = "assets/img/logo-light.svg"
    readonly themeSwitcher = inject(ThemeSwitcher)
    private readonly dialog = inject(ModalService);
    private readonly _breakpointObserver = inject(BreakpointObserver);
    private readonly _router = inject(Router);

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

    createTransaction(operation: Operation) {
        const dialogRef = this.dialog.open(FinTransactionModalComponent, { data: { operation } });
        dialogRef.afterClosed().subscribe(() => {});
    }

    createCreditCardTransaction() {
        const dialogRef = this.dialog.open(FinCCTransactionModalComponent);
        dialogRef.afterClosed().subscribe(() => {});
    }

    private _watchBreakpoint(): void {
        this._breakpointObserver.observe(["(max-width: 1024px)"]).subscribe((screenSize: BreakpointState) => this.isMobile = screenSize.matches);
    }
}
