import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '@app/shared/services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    @if (alertService.activeAlert()) {
    <div
      class="alert alert-{{
        alertService.activeAlert()?.status
      }} mt-3 mb-0 d-flex align-items-center justify-content-between gap-3 "
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
    class: 'position-absolute alert-position',
  },

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  alertService: AlertService = inject(AlertService);
}
