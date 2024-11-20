import { Directive, ElementRef, Renderer2, ViewContainerRef } from "@angular/core";
import { FinTableSorterComponent } from "../fin-table-sorter/fin-table-sorter.component";

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
        const componentRef = this.viewContainerRef.createComponent(FinTableSorterComponent);
        const newDiv = this.renderer.createElement("div");
        this.renderer.appendChild(newDiv, this.renderer.createText(column));
        this.renderer.appendChild(newDiv, componentRef.location.nativeElement);
        this.renderer.appendChild(this.el.nativeElement, newDiv);
    }
}