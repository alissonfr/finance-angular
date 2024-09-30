import { SidenavItem } from "@core/components/sidenav/sidenav-item.type";

export const SidenavItems: SidenavItem[] = [
    {
        name: "Principal",
        route: "/dashboard",
        icon: "grid_view"
    },
    {
        name: "Transações",
        route: "/transacoes",
        icon: "paid"
    },
    {
        name: "Relatórios",
        route: "/reports",
        icon: "summarize"
    },
]