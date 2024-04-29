import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from "@angular/material/expansion";
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItem } from '../../../types/sidenav-item.type';
import { HeaderComponent } from '../header/header.component';
import { SidenavItems } from './sidenav-items';

@Component({
  selector: 'sidenav-component',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSidenavModule, HeaderComponent, MatListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  items: SidenavItem[] = SidenavItems;
  navMode: MatDrawerMode = "side";
  navOpened = true;
  @ViewChildren(MatExpansionPanel) expansion: QueryList<MatExpansionPanel>;
  
  constructor ( ) {}

  changeSize (size: "mini" | "normal") {
    if (size == "mini") this.expansion.forEach((item) => item.close());
}
}
