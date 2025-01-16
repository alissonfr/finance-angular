import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "chevron",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./chevron.component.html",
})
export class ChevronComponent {
    @Input({ required: true }) direction: "left" | "right";
    @Input() disabled: boolean = false;
}
