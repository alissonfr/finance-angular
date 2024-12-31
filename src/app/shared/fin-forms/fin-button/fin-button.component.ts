import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { LoadingService } from "@services/loading.service";

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
  @Input() color: "primary" | "secondary" | "outlined" | "cancel" | "plain" = "primary";
  @Input() disabled: boolean = false;
  @Input() startIcon?: string;

  protected loadingService = inject(LoadingService);

  get classes() {
      return `${this.size} ${this.color} ${this.class}`;
  }

}
