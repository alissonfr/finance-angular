/* eslint-disable @angular-eslint/no-output-native */
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
    selector: "fin-textarea",
    imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
    templateUrl: "./fin-textarea.component.html",
    styleUrl: "./fin-textarea.component.scss",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FinTextAreaComponent),
            multi: true,
        },
    ]
})
export class FinTextAreaComponent implements ControlValueAccessor {
    @Input() type: string = "text";
    @Input() name: string = "";
    @Input() placeholder: string = "";
    @Input() autocomplete: string = "off";
    @Input() initialValue: string;
    @Input() label: string;
    
    @Output() focus = new EventEmitter<void>();
    @Output() blur = new EventEmitter<void>();
    
    protected disabled: boolean;
    protected value: string = "";
    protected control: FormControl;
  
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
