import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: "not-found",
    imports: [CommonModule, RouterModule],
    templateUrl: "./not-found.component.html",
    styleUrl: "./not-found.component.scss"
})
export class NotFoundComponent {}
