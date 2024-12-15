import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./bank-accounts.component").then(c => c.BankAccountComponent)
    },
];
