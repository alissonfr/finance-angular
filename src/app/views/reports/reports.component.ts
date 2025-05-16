/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgApexchartsModule, ApexAxisChartSeries,
    ApexNonAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexResponsive,
    ApexLegend,
    ApexTitleSubtitle } from "ng-apexcharts";

@Component({
    selector: "reports",
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: "./reports.component.html",
    styleUrl: "./reports.component.scss"
})
export class ReportsComponent {
// Donut - Gastos por categoria
    donutSeries: ApexNonAxisChartSeries = [44, 55, 13, 43, 22];
    donutChart: ApexChart = { type: "donut" };
    donutLabels = ["Alimentação", "Transporte", "Lazer", "Educação", "Outros"];
    donutLegend: ApexLegend = { position: "right" };
    donutResponsive: ApexResponsive[] = [
        {
            breakpoint: 480,
            options: {
                chart: { width: 320 },
                legend: { position: "bottom" },
            },
        },
    ];

    // Área - Evolução mensal de gastos
    areaSeries: ApexAxisChartSeries = [
        {
            name: "Gastos",
            data: [450, 470, 520, 600, 580, 630, 700],
        },
    ];
    areaChart: ApexChart = { type: "area", height: 350 };
    areaXAxis: ApexXAxis = { categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"] };
    areaDataLabels: ApexDataLabels = { enabled: false };
    areaStroke: ApexStroke = { curve: "smooth" };

    // Barras - Receita vs Despesa
    barSeries: ApexAxisChartSeries = [
        {
            name: "Receita",
            data: [5000, 5200, 5100, 5300, 5600, 5900, 6200],
        },
        {
            name: "Despesa",
            data: [4500, 4700, 4800, 5000, 5100, 5500, 5700],
        },
    ];
    barChart: ApexChart = { type: "bar", height: 350 };
    barXAxis: ApexXAxis = { categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"] };
    barTitle: ApexTitleSubtitle = { text: "Receitas vs Despesas", align: "center" };
} 