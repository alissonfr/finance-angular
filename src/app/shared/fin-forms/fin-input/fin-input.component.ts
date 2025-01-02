/* eslint-disable @angular-eslint/no-output-native */
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from "@angular/material/datepicker";
import { formatToCurrency, formatToNumeric } from "@utils/parsers";

@Component({
    selector: "fin-input",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
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
    @Input() name: string = "";
    @Input() placeholder: string = "";
    @Input() autocomplete: string = "off";
    @Input() matDatepicker: MatDatepickerPanel<MatDatepickerControl<unknown>, unknown, unknown>;
    @Input() initialValue: string;
    @Input() label: string;
    @Input() currency: string;
    
    @Output() focus = new EventEmitter<void>();
    @Output() blur = new EventEmitter<void>();
    
    protected disabled: boolean;
    protected value: string = "";
    protected control: FormControl;

    get isCurrency() {
        return this.currency || this.currency === "";
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

    onInputChange(event: Event): void {
        const value = (event.target as HTMLInputElement)?.value ?? "";
        if(this.isCurrency) {
            this.value = formatToCurrency(formatToNumeric(value));
        } else {
            this.value = value;
        }
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
