import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FinAutocompleteComponent } from "./fin-autocomplete/fin-autocomplete.component";
import { FinButtonComponent } from "./fin-button/fin-button.component";
import { FinDatePickerComponent } from "./fin-date-picker/fin-date-picker.component";
import { FinInputComponent } from "./fin-input/fin-input.component";
import { FinTextAreaComponent } from "./fin-textarea/fin-textarea.component";

const components = [
    FinInputComponent, 
    FinDatePickerComponent, 
    FinAutocompleteComponent,
    FinButtonComponent,
    FinTextAreaComponent
]

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule, ...components],
    exports: [...components]
})
export class FinFormsModule { }
