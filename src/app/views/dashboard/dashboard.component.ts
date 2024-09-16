import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { DashboardCardComponent } from "./components/dashboard-card/dashboard-card.component";

@Component({
    selector: "dashboard",
    standalone: true,
    imports: [CommonModule, DashboardCardComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {

}
