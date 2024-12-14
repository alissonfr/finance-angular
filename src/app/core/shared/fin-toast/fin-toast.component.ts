import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ToastService } from "@services/toast.service";

@Component({
    selector: "fin-toast",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./fin-toast.component.html",
    styleUrl: "./fin-toast.component.scss"
})
export class FinToastComponent {
    toastService = inject(ToastService);
  
    removeToast(id: string) {
        this.toastService.removeToast(id);
    }
}
