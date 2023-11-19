import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcher } from './utils/theme.switcher';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: "<router-outlet></router-outlet>",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  
  constructor(
    private _themeSwitcher: ThemeSwitcher
    ) { }
  
  ngOnInit(): void {
    this._themeSwitcher.load();
  }
}
