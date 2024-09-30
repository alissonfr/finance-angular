import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "table-sorter",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./table-sorter.component.html"
})
export class TableSorterComponent {

}
