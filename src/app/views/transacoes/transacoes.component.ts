import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "transacoes",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./transacoes.component.html",
    styleUrl: "./transacoes.component.scss"
})
export class TransacoesComponent {

}
