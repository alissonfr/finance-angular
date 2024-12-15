/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FinInputComponent } from "../fin-input/fin-input.component";

@Component({
    selector: "fin-autocomplete",
    imports: [CommonModule, FinInputComponent],
    standalone: true,
    templateUrl: "./fin-autocomplete.component.html",
    styleUrl: "./fin-autocomplete.component.scss"
})
export class FinAutocompleteComponent {
  @HostListener("document:click", ["$event"])
    clickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest(".dropdown-container")) {
            this.closeDropdown();
        }
    }

  @Input({ required: true }) items: any[] = [];
  @Input({ required: true }) displayProperty: any;
  @Input({ required: true }) formGroup: FormGroup;
  @Input({ required: true }) controlName: string;

  @Output() addNewItem = new EventEmitter<string>();

  searchControl = new FormControl("");
  filteredItems: typeof this.items = [];
  isDropdownOpen: boolean = false;

  ngOnInit() {
      this.filteredItems = this.items;
      this.searchControl.valueChanges.subscribe(value => this.filterItems(value));

      const initialValue = this.formGroup.get(this.controlName)?.value;
      if (initialValue) {
          this.searchControl.setValue(initialValue[this.displayProperty]);
      }
  }

  filterItems(query: string | null) {
      if (!query) {
          this.filteredItems = this.items;
          return
      }
      this.filteredItems = this.items.filter(item =>
          item[this.displayProperty].toLowerCase().includes(query.toLowerCase())
      );
  }

  selectItem(item: any) {
      this.formGroup.get(this.controlName)?.setValue(item);
      this.isDropdownOpen = false;
  }

  openDropdown() {
      this.isDropdownOpen = true;
      this.filterItems(this.searchControl.value);
  }

  closeDropdown() {
      this.isDropdownOpen = false;
  }

  onAddNew() {
      const newItem = this.searchControl.value;
      if (newItem) {
          this.addNewItem.emit(newItem);
          this.searchControl.setValue("");
          this.isDropdownOpen = false;
      }
  }

}
