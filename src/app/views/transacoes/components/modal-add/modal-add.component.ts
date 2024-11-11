import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AutocompleteComponent } from "@core/components/autocomplete/autocomplete.component";

@Component({
    selector: "app-modal-add",
    standalone: true,
    imports: [ReactiveFormsModule, AutocompleteComponent],
    templateUrl: "./modal-add.component.html",
    styleUrl: "./modal-add.component.scss"
})
export class ModalAddComponent {
    formGroup = new FormGroup({
        date: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required]),

        categoryId: new FormControl("", [Validators.required]),
        accountId: new FormControl("", [Validators.required]),
        userId: new FormControl("", [Validators.required]),
    });

    users: unknown[] = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
    ];

    submit(): void {
        console.log(this.formGroup.value)
    }

    handleAddNew(prop: string) {
        console.log(prop)
    }
}
