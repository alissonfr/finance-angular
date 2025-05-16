/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { first } from "rxjs";
import { Category } from "src/app/models/category";
import { FinCategoryIconComponent } from "../../fin-ui/fin-category-icon/fin-category-icon.component";
import { FinInputComponent } from "../fin-input/fin-input.component";

@Component({
    selector: "fin-autocomplete",
    imports: [CommonModule, FinInputComponent, ReactiveFormsModule, MatIconModule, FinCategoryIconComponent],
    templateUrl: "./fin-autocomplete.component.html",
    styleUrl: "./fin-autocomplete.component.scss"
})
export class FinAutocompleteComponent {
    @Input({ required: true }) items: any[] = [];
    @Input({ required: true }) displayProperty: any;
    @Input({ required: true }) formGroup: FormGroup;
    @Input({ required: true }) controlName: string;
    @Input() label: string;

    @Output() addNewItem = new EventEmitter<string>();

    @ViewChild(FinInputComponent) input: FinInputComponent;
    @ViewChild(FinInputComponent, { static: true, read: ElementRef }) inputRef: ElementRef;
    
    filteredItems: typeof this.items = [];
    isDropdownOpen: boolean = false;
    
    searchFormGroup = new FormGroup({
        searchControl: new FormControl(""),
    });
        
    ngOnInit() {
        this.filteredItems = this.items;
        const autocompleteInput = this.searchFormGroup.get("searchControl");
        const propInput = this.formGroup.get(this.controlName);
        this.setInitialValue();
        
        autocompleteInput?.valueChanges.subscribe(value => {
            if(!this.isDropdownOpen && value) this.isDropdownOpen = true;
            propInput?.reset();
            this.filterItems(value);
        });
        
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

    filterItems(query: string | null | undefined) {
        if (!query) {
            this.filteredItems = this.items;
            return
        }
        this.filteredItems = this.items.filter(item =>
            item[this.displayProperty].toLowerCase().includes(query.toLowerCase())
        );
    }

    selectItem(item: any) {
        this.input.writeValue(item[this.displayProperty])
        this.formGroup.get(this.controlName)?.setValue(item);
        this.isDropdownOpen = false;
    }

    openDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
        this.filterItems(this.searchFormGroup.get("searchControl")?.value);
    }

    closeDropdown() {
        this.isDropdownOpen = false;
    }

    onAddNew() {
        const newItem = this.searchFormGroup.get("searchControl")?.value;
        this.addNewItem.emit(newItem || "");
        this.searchFormGroup.get("searchControl")?.setValue("");
        this.isDropdownOpen = false;
    }

    getCategory(item: any): Category {
        return item as Category
    }

}
