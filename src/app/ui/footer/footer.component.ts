import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <small>
      <a
        href="https://github.com/Mohamedrezk-web/parent-aps-assessment"
        class="text-light text-decoration-none"
        >Parent App Assessment</a
      >
      &copy; 2024</small
    >
  `,
  host: {
    class: 'py-3 bg-dark text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor() {}
}
