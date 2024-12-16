import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "fin-button",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./fin-button.component.html",
    styleUrls: ["./fin-button.component.scss"]
})
export class FinButtonComponent {
  @Input() class: string = "";
  @Input() size: "normal" | "large" = "normal";
  @Input() color: "primary" | "secondary" | "outlined" | "cancel" = "primary";
  @Input() disabled: boolean = false;
  @Input() startIcon?: string;

  get classes() {
      return `${this.size} ${this.color} ${this.class}`;
  }

}
