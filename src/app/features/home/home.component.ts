import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface ServiceCard {
  id: string;
  available: boolean;
  icon: string;
}

@Component({
  selector: 'pcw-home',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomepageComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  readonly services: ServiceCard[] = [
    { id: 'residency-certificate', available: true,  icon: '🏠' },
    { id: 'family-status',         available: true,  icon: '👨‍👩‍👧' },
    { id: 'identity-card',         available: false, icon: '🪪' },
  ];

  ngOnInit(): void {
    document.title = this.translate.instant('home.title');
  }
}
