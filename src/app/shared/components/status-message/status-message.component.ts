import { Component, input } from '@angular/core';

@Component({
  selector: 'pcw-status-message',
  standalone: true,
  templateUrl: './status-message.component.html',
  styleUrl: './status-message.component.scss',
})
export class StatusMessageComponent {
  /** Visual and semantic type of the message */
  readonly type = input.required<'success' | 'error'>();

  /** Short heading for the message */
  readonly title = input.required<string>();

  /** Optional detailed description */
  readonly message = input<string>('');

  /** Resolved icon character — not colour-only (WCAG 1.4.1) */
  get icon(): string {
    return this.type() === 'success' ? '✓' : '✕';
  }

  /** Accessible icon label for screen readers */
  get iconLabel(): string {
    return this.type() === 'success' ? 'Success' : 'Error';
  }
}
