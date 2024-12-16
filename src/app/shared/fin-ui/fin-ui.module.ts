import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PageHeaderComponent } from "./page-header/page-header.component";

const components = [
    PageHeaderComponent
]

@NgModule({
    declarations: [],
    imports: [CommonModule, ...components],
    exports: [...components]
})
export class FinUiModule { }
