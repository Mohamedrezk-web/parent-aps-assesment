import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  activeAlert = signal<{
    message: string;
    status:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light';
  } | null>(null);

  notify(
    message: string,
    status:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light'
  ) {
    this.activeAlert.set({ message, status });
    setTimeout(() => this.activeAlert.set(null), 2000);
  }

  closeAlert() {
    this.activeAlert.set(null);
  }
}
