/* eslint-disable @angular-eslint/no-output-native */
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, forwardRef, Input, Optional, Output } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from "@angular/material/datepicker";
import { NgxCurrencyDirective } from "ngx-currency";

@Component({
    selector: "fin-input",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, NgxCurrencyDirective],
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

    constructor(@Optional() private controlContainer: ControlContainer) {}

    ngAfterViewInit() {
        console.log(this.currency)
        if (this.controlContainer && this.name) {
            const formGroup = this.controlContainer.control as FormGroup;
            this.control = formGroup?.get(this.name) as FormControl;
        }

        setTimeout(() => this.writeValue(this.initialValue), 0)
    }
  
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
