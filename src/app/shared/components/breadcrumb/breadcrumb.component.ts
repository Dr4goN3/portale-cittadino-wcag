import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  path?: string; // omit for the current (last) page
}

@Component({
  selector: 'pcw-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  /** The ordered list of breadcrumb steps; the last item is the current page */
  readonly items = input.required<BreadcrumbItem[]>();
}
