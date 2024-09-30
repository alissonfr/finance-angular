import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FinColDirective } from "./directives/fin-col.directive";

const directives = [
    FinColDirective,
]

@NgModule({
    declarations: [...directives],
    imports: [CommonModule],
    exports: [...directives]
})
export class FinTableModule { }
