// toast.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    message: string;
    type?: ToastType;
  }

@Injectable({
    providedIn: "root",
})
export class ToastService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    success(message: string, duration: number = 3000) {
        this.addToast("success", message, duration);
    }

    error(e: unknown, duration: number = 3000) {
        console.log(e)
        this.addToast("error", "aa", duration);
    }

    info(message: string, duration: number = 3000) {
        this.addToast("info", message, duration);
    }

    warning(message: string, duration: number = 3000) {
        this.addToast("warning", message, duration);
    }

    removeToast(id: string) {
        const updatedToasts = this.toastsSubject
            .getValue()
            .filter(toast => toast.id !== id);
        this.toastsSubject.next(updatedToasts);
    }

    private addToast(type: ToastType, message: string, duration: number) {
        const id = crypto.randomUUID();
        const newToast: Toast = { id, message, type };
        const currentToasts = this.toastsSubject.getValue();
        this.toastsSubject.next([...currentToasts, newToast]);

        setTimeout(() => this.removeToast(id), duration);
    }
}
