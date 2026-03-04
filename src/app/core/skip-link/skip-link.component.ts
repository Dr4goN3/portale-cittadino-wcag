import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * SkipLinkComponent
 *
 * Provides a "Skip to main content" link as the very first focusable element.
 * WCAG 2.4.1 Bypass Blocks (Level A):
 * Keyboard users can skip repeated navigation and jump directly to the main
 * content region via the #main-content anchor.
 *
 * The link is visually hidden by default (.skip-link class from styles.scss)
 * and becomes visible only when it receives keyboard focus.
 */
@Component({
  selector: 'pcw-skip-link',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <a class="skip-link" href="#main-content">
      {{ 'skip.mainContent' | translate }}
    </a>
  `,
})
export class SkipLinkComponent {}
