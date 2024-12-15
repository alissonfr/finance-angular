import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./bank-account-transactions.component").then(c => c.BankAccountTransactionsComponent)
    },
];
