import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "add-button",
    standalone: true,
    imports: [CommonModule, MatIconModule, MatTooltipModule],
    templateUrl: "./add-button.component.html",
})
export class AddButtonComponent {
}
