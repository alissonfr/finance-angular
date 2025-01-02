import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./categories.component").then(c => c.BankAccountComponent)
    },
];
