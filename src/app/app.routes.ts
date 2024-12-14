import { Routes } from "@angular/router";
import { SidenavComponent } from "@core/sidenav/sidenav.component";
import { authGuard } from "src/app/guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
    },
    {
        path: "auth",
        loadChildren: () => import("./views/auth/auth.routes").then((r) => r.routes),
    },
    {
        path: "dashboard",
        loadChildren: () => import("./views/dashboard/dashboard.routes").then((r) => r.routes),
        component: SidenavComponent,
        canActivate: [authGuard]
    },
    {
        path: "transacoes",
        loadChildren: () => import("./views/transacoes/transacoes.routes").then((r) => r.routes),
        component: SidenavComponent,
        canActivate: [authGuard]
    },
    {
        path: "not-found",
        loadChildren: () => import("./views/not-found/not-found.routes").then((r) => r.routes),
    },
    {
        path: "**",
        redirectTo: "not-found",
    },
];
