// toast.service.ts
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    message: string;
    type?: ToastType;
}

const INVALID_FORM_MSG = "Preencha todos os campos corretamente.";

@Injectable({
    providedIn: "root",
})
export class ToastService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    invalidForm(duration: number = 3000) {
        this.warning(INVALID_FORM_MSG, duration);
    }

    success(message: string, duration: number = 3000) {
        this.addToast("success", message, duration);
    }

    error(e: HttpErrorResponse, message: string, duration: number = 3000) {
        this.addToast("error", e?.error?.message?.message || message, duration);
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
