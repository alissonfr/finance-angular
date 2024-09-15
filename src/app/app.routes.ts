import { Routes } from "@angular/router";
import { SidenavComponent } from "@core/components/sidenav/sidenav.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
    },
    {
        path: "login",
        loadChildren: () => import("./views/auth/auth.routes").then((r) => r.routes),
    },
    {
        path: "dashboard",
        loadChildren: () => import("./views/dashboard/dashboard.routes").then((r) => r.routes),
        component: SidenavComponent,
    },
    {
        path: "transacoes",
        loadChildren: () => import("./views/transacoes/transacoes.routes").then((r) => r.routes),
        component: SidenavComponent,
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
