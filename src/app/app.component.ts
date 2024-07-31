import { Component } from '@angular/core';
import { LayoutComponent } from './ui/layout/layout.component';
import { LoginComponent } from './pages/auth/containers/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
