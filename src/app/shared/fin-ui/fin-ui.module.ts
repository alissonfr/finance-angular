import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FinCategoryIconComponent } from "./fin-category-icon/fin-category-icon.component";
import { PageHeaderComponent } from "./page-header/page-header.component";

const components = [
    PageHeaderComponent,
    FinCategoryIconComponent
]

@NgModule({
    declarations: [],
    imports: [CommonModule, ...components],
    exports: [...components]
})
export class FinUiModule { }
