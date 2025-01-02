import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CategoryService } from "@services/api/category.service";
import { ToastService } from "@services/toast.service";
import { isFormInvalid } from "@utils/validators";
import { COLORS } from "src/app/constants/colors.constant";
import { Category } from "src/app/models/category";
import { Icon } from "src/app/models/icon";
import { FinFormsModule } from "src/app/shared/fin-forms/fin-forms.module";


@Component({
    selector: "category-modal",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FinFormsModule, MatIconModule, MatTooltipModule],
    templateUrl: "./category-modal.component.html",
    styleUrl: "./category-modal.component.scss"
})
export class CategoryModalComponent {
    readonly colors = COLORS;
    icons: Icon[] = [];
    
    formGroup = new FormGroup({
        categoryId: new FormControl(0),
        name: new FormControl("", [Validators.required]),
    });
    
    private readonly categoryService = inject(CategoryService)
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(MatDialogRef<CategoryModalComponent>);
    private readonly data = inject(MAT_DIALOG_DATA);

    ngOnInit() {
        if(this.data?.id) this.get(this.data.id);
        this.getIcons();
    }

    close(): void {
        this.dialog.close();
    }

    submit(): void {
        if(isFormInvalid(this.formGroup)) {
            this.toastService.invalidForm();
            return;
        }

        const category = this.formGroup.getRawValue() as unknown as Category;

        if(category.categoryId) {
            this.update(category.categoryId, category);
        } else {
            this.create(category)
        }
    }

    private get(id: number): void {
        this.categoryService.get(id).subscribe({
            next: result => this.formGroup.patchValue(result),
            error: e => this.toastService.error(e, "Erro ao obter categoria.")
        });
    }

    private create(category: Category) {
        this.categoryService.create(category).subscribe({
            next: () => {
                this.toastService.success("Categoria criada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao criar categoria.")
        });
    }

    private update(id: number, category: Category) {
        this.categoryService.update(id, category).subscribe({
            next: () => {
                this.toastService.success("Categoria atualizada com sucesso.");
                this.close();
            },
            error: e => this.toastService.error(e, "Erro ao atualizar categoria.")
        });
    }

    private getIcons() {
        this.categoryService.getIcons().subscribe({
            next: result => this.icons = result,
            error: e => this.toastService.error(e, "Erro ao obter icones.")
        });
    }
}
