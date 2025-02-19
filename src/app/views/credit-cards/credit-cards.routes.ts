import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./credit-cards.component").then(c => c.CreditCardsComponent)
    },
];
