import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Category } from "src/app/models/category";

@Component({
    selector: "fin-category-icon",
    imports: [MatIconModule, MatIconModule, MatTooltipModule],
    templateUrl: "./fin-category-icon.component.html",
    styleUrl: "./fin-category-icon.component.scss"
})
export class FinCategoryIconComponent {
    @Input({ required: true }) category: Category
    @Input() size: "normal" | "small" = "normal";
}
