import { SidenavItem } from "./sidenav-item.type";

export const SidenavItems: SidenavItem[] = [
    {
        name: "Principal",
        route: "/dashboard",
        icon: "grid_view"
    },
    {
        name: "Contas bancárias",
        route: "/bank-accounts",
        icon: "paid"
    },
    {
        name: "Cartões de crédito",
        route: "/credit-cards",
        icon: "credit_card"
    },
    {
        name: "Categorias",
        route: "/categories",
        icon: "bookmark"
    },
    {
        name: "Relatórios",
        route: "/reports",
        icon: "summarize"
    },
]