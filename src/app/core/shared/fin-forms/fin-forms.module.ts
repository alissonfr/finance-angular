import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FinAutocompleteComponent } from "./fin-autocomplete/fin-autocomplete.component";
import { FinDatePickerComponent } from "./fin-date-picker/fin-date-picker.component";
import { FinInputComponent } from "./fin-input/fin-input.component";

const components = [
    FinInputComponent, 
    FinDatePickerComponent, 
    FinAutocompleteComponent
]

@NgModule({
    declarations: [],
    imports: [CommonModule, ...components],
    exports: [...components]
})
export class FinFormsModule { }
