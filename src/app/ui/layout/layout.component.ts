import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  host: {
    class: 'd-flex flex-column h-100 w-100',
  },
})
export class LayoutComponent {
  constructor() {}
}
