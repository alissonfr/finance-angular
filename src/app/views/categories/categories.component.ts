import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { CategoryService } from "@services/api/category.service";
import { ModalService } from "@services/modal.service";
import { ToastService } from "@services/toast.service";
import { Category } from "src/app/models/category";
import { FinUiModule } from "src/app/shared/fin-ui/fin-ui.module";
import { FinFormsModule } from "../../shared/fin-forms/fin-forms.module";
import { FinCategoryIconComponent } from "../../shared/fin-ui/fin-category-icon/fin-category-icon.component";
import { CategoryModalComponent } from "./components/bank-account-modal/category-modal.component";

@Component({
    selector: "categories",
    standalone: true,
    imports: [CommonModule, MatIconModule, FinFormsModule, FinUiModule, MatMenuModule, ReactiveFormsModule, FinCategoryIconComponent],
    templateUrl: "./categories.component.html",
    styleUrl: "./categories.component.scss"
}) 
export class BankAccountComponent {
    categories: Category[] = [];

    formGroup = new FormGroup({
        name: new FormControl(""),
    });

    private readonly categoryService = inject(CategoryService);
    private readonly toastService = inject(ToastService);
    private readonly dialog = inject(ModalService);

    ngOnInit() {
        this.find();
    }

    find(): void {
        this.categoryService.find(this.formGroup.getRawValue()).subscribe({
            next: (categories) => this.categories = categories,
            error: e => this.toastService.error(e, "Erro ao obter categorias.")
        });
    }

    create() {
        const dialogRef = this.dialog.open(CategoryModalComponent);
        dialogRef.afterClosed().subscribe(() => this.find());
    }

    update(id?: number) {
        const dialogRef = this.dialog.open(CategoryModalComponent, { data: { id } });
        dialogRef.afterClosed().subscribe(() => this.find());
    }

    delete(category: Category) {
        const dialogRef = this.dialog.confirm({
            title: "Apagar categoria",
            message: `Você está prestes a apagar a categoria "${category.name}". Você tem certeza?`
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.categoryService.delete(category.categoryId).subscribe({
                    next: () => {
                        this.toastService.success("Conta bancária apagada com sucesso.")
                        this.find();
                    },
                    error: e => this.toastService.error(e, "Erro ao apagar conta bancária.")
                });
            }
            
        });
    }

    clear() {
        this.formGroup.reset();
        this.find();
    }
}
