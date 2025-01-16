/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { first } from "rxjs";
import { FinInputComponent } from "../fin-input/fin-input.component";

@Component({
    selector: "fin-select",
    imports: [CommonModule, FinInputComponent, ReactiveFormsModule, MatIconModule],
    standalone: true,
    templateUrl: "./fin-select.component.html",
    styleUrl: "./fin-select.component.scss"
})
export class FinSelectComponent {
    @Input({ required: true }) items: any[] = [];
    @Input({ required: true }) displayProperty: any;
    @Input({ required: true }) formGroup: FormGroup;
    @Input({ required: true }) controlName: string;
    @Input() label: string;

    @Output() addNewItem = new EventEmitter<string>();

    @ViewChild(FinInputComponent) input: FinInputComponent;
    @ViewChild(FinInputComponent, { static: true, read: ElementRef }) inputRef: ElementRef;

    isDropdownOpen: boolean = false;

    searchFormGroup = new FormGroup({
        searchControl: new FormControl(""),
    });

    ngOnInit() {
        const propInput = this.formGroup.get(this.controlName);
        console.log(propInput)
        this.setInitialValue();
        
        if(propInput?.hasValidator(Validators.required)) {
            propInput?.events.subscribe(() => {
                if(propInput?.invalid && propInput?.touched) {
                    this.inputRef.nativeElement.classList.add("ng-touched", "ng-invalid")
                } else {
                    this.inputRef.nativeElement.classList.remove("ng-touched", "ng-invalid")
                }
            });
        }
    }

    setInitialValue() {
        this.formGroup.get(this.controlName)?.valueChanges.pipe(first()).subscribe(value => this.selectItem(value));
    }

    selectItem(item: any) {
        this.input.writeValue(item[this.displayProperty])
        this.formGroup.get(this.controlName)?.setValue(item);
        this.isDropdownOpen = false;
    }

    openDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown() {
        this.isDropdownOpen = false;
    }

}
