import { SidenavItem } from "@interfaces/sidenav-item.interface";

export const SidenavItems: SidenavItem[] = [
    {
        name: "Principal",
        route: "/dashboard",
        icon: "grid_view"
    },
    {
        name: "Transações",
        route: "/transactions",
        icon: "paid"
    },
    {
        name: "Relatórios",
        route: "/reports",
        icon: "summarize"
    },
]