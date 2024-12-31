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
        name: "Relatórios",
        route: "/reports",
        icon: "summarize"
    },
]