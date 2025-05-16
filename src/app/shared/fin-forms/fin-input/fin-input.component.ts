/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-native */
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { formatToCurrency, formatToNumeric } from "@utils/parsers";
import { NgxMaskDirective } from "ngx-mask";

@Component({
    selector: "fin-input",
    imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatIconModule, NgxMaskDirective],
    templateUrl: "./fin-input.component.html",
    styleUrl: "./fin-input.component.scss",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FinInputComponent),
            multi: true,
        },
    ]
})
export class FinInputComponent implements ControlValueAccessor {
    @Input() type: string = "text";
    @Input() name: string = "";
    @Input() placeholder: string = "";
    @Input() autocomplete: string = "off";
    @Input() initialValue: string;
    @Input() label: string;
    @Input() currency: string;
    @Input() datePicker: string;
    @Input() mask: string;
    
    @Output() focus = new EventEmitter<void>();
    @Output() blur = new EventEmitter<void>();
    
    protected disabled: boolean;
    protected value: string = "";
    protected control: FormControl;

    get isCurrency() {
        return this.currency || this.currency === "";
    }

    get isDatePicker() {
        return this.datePicker || this.datePicker === "";
    }
  
    onChanged: (value: string) => void;
    onTouched: () => void;
  
    writeValue(value: string) {
        if(this.isCurrency && this.value) {
            this.value = formatToNumeric(value).toString() ?? "";
        } else {
            this.value = value ?? "";
        }
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

    onInputChange(event: Event | MatDatepickerInputEvent<Date>): void {
        if(event instanceof MatDatepickerInputEvent) return this.onChanged(event.value?.toISOString() || "");
        const target = (event.target as HTMLInputElement)
        
        const value = target?.value ?? "";
        if(this.isCurrency) {
            this.value = formatToCurrency(formatToNumeric(value));
            target.value = this.value;
            this.onChanged(formatToNumeric(value).toString())
            return
        }
        this.value = value;
        this.onChanged(value);
    }

    onFocus() {
        this.focus.emit();
    }

    onBlur() {
        setTimeout(() => {
            this.blur.emit();
            if (this.onTouched) {
                this.onTouched();
            }
        }, 150)
    }
}
