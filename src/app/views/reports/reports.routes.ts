import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./reports.component").then(c => c.ReportsComponent)
    },
];
