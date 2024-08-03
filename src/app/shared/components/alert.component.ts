import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    @if (alertService.activeAlert()) {
    <div
      class="alert alert-{{
        alertService.activeAlert()?.status
      }} mt-3 mb-0 d-flex align-items-center justify-content-between"
      role="alert"
    >
      <strong>
        {{ alertService.activeAlert()?.message }}
      </strong>

      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="alertService.closeAlert()"
      ></button>
    </div>

    }
  `,
  imports: [],
  host: {
    class: ' w-100',
  },
  styles: `
  .spinner {
    width: 3rem;
    height: 3rem;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  alertService: AlertService = inject(AlertService);
}
