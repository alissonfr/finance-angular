/* eslint-disable @typescript-eslint/no-explicit-any */
// standalone: true,
// imports: [CommonModule],

import { CommonModule, DatePipe } from "@angular/common";
import { AfterContentInit, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "fin-table",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    providers: [DatePipe],
    templateUrl: "./fin-table.component.html",
    styleUrls: ["./fin-table.component.scss"],
})
export class FinTableComponent implements AfterContentInit {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() displayColumns: string[] = [];

  @Output() sorted = new EventEmitter<{ column: string, direction: "asc" | "desc" }>();

  sortedColumn: string | null = null;
  sortDirection: "asc" | "desc" | null = null;

  private datePipe = inject(DatePipe)

  ngAfterContentInit() {
      if (!this.columns || this.columns.length === 0) {
          this.columns = Object.keys(this.data[0] || {});
      }
  }

  getColumnValue(row: any, column: string): string {
      const nestedColumn = column.split(".");
      if(nestedColumn.length <= 1) {
          const value = row[column]
          
          const parsedDate = new Date(value);
          if (!isNaN(parsedDate.getTime())) {
              return this.datePipe.transform(parsedDate, "dd/MM/yyyy") || value;
          }
          
          return value;
      }
        
      // pra quem disse que leet code nao serve pra nada
      return this.getColumnValue(row[nestedColumn[0]], nestedColumn.slice(1).join())
  }

  sortData(column: string) {
      if (this.sortedColumn === column) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
          this.sortedColumn = column;
          this.sortDirection = "asc";
      }

      this.data.sort((a, b) => {
          const aValue = this.getColumnValue(a, column);
          const bValue = this.getColumnValue(b, column);

          if (aValue < bValue) {
              return this.sortDirection === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
              return this.sortDirection === "asc" ? 1 : -1;
          }
          return 0;
      });

      this.sorted.emit({ column, direction: this.sortDirection });
  }
}
