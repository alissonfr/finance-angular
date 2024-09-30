import { Directive, ElementRef, Renderer2, ViewContainerRef } from "@angular/core";
import { TableSorterComponent } from "@core/components/table-sorter/table-sorter.component";

@Directive({
    selector: "th[fin-col]",
})
export class FinColDirective {
    constructor(
        private el: ElementRef
    ) {
        el.nativeElement.setAttribute("scope", "col");
    }
}

@Directive({
    selector: "th[fin-sort-header]",
})
export class FinSortHeaderDirective {
    constructor(
        private el: ElementRef, 
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2
    ) {}
    
    ngOnInit() {
        const column = this.el.nativeElement.textContent;
        this.el.nativeElement.textContent = ""
        const componentRef = this.viewContainerRef.createComponent(TableSorterComponent);
        const newDiv = this.renderer.createElement("div");
        this.renderer.appendChild(newDiv, this.renderer.createText(column));
        this.renderer.appendChild(newDiv, componentRef.location.nativeElement);
        this.renderer.appendChild(this.el.nativeElement, newDiv);
    }
}

/*


    <tbody>
        <tr class="">
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                </div>
            </td>
            <th class="px-6 py-4">
                29/09/2024
            </th>
            <td class="px-6 py-4">
                Feira no atacadao
            </td>
            <td class="px-6 py-4">
                Supermercado
            </td>
            <td class="px-6 py-4">
                Itau
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                $2999
            </td>
            <td class="px-6 py-4">
                <mat-icon class="material-symbols-outlined ">more_vert</mat-icon>
            </td>
        </tr>
    </tbody>


*/