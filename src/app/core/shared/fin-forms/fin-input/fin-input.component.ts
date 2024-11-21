/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from "@angular/material/datepicker";

@Component({
    selector: "fin-input",
    standalone: true,
    imports: [ReactiveFormsModule, MatDatepickerModule],
    templateUrl: "./fin-input.component.html",
    styleUrl: "./fin-input.component.scss",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FinInputComponent),
            multi: true,
        },
    ],
})
export class FinInputComponent implements ControlValueAccessor {
    @Input() type: string = "text";
    @Input() id: string;
    @Input() placeholder: string;
    @Input() autocomplete: string = "off";
    @Input() matDatepicker: MatDatepickerPanel<MatDatepickerControl<unknown>, unknown, unknown>;

    @Output() focus = new EventEmitter<void>();
    @Output() blur = new EventEmitter<void>();

    protected disabled: boolean;
    protected value: string;
  
    onChanged: (value: string) => void;
    onTouched: () => void;
  
    writeValue(value: string) {
        this.value = value ?? "";
    }
  
    registerOnChange(fn: (value: string) => void) {
        this.onChanged = fn;
    }
  
    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }
  
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInputChange(event: Event): void {
        const value = (event.target as HTMLInputElement)?.value ?? "";
        this.value = value;
        this.onChanged(value);
    }

    onFocus() {
        this.focus.emit();
    }

    onBlur() {
        this.blur.emit();
        if (this.onTouched) {
            this.onTouched();
        }
    }
}
