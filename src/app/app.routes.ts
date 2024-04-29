import { Routes } from "@angular/router";
import { DashboardComponent } from "@views/dashboard/dashboard.component";
import { NotFoundComponent } from "@views/not-found/not-found.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "404",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "404",
    },
];
