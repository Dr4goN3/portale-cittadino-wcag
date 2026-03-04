import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';

export interface ServiceDetail {
  id: string;
  available: boolean;
}

const SERVICE_DATA: Record<string, ServiceDetail> = {
  'residency-certificate': { id: 'residency-certificate', available: true },
  'family-status':         { id: 'family-status',         available: true },
  'identity-card':         { id: 'identity-card',         available: false },
};

@Component({
  selector: 'pcw-service-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TranslateModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss',
})
export class ServiceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);

  service: ServiceDetail | null = null;
  notFound = false;
  docs: string[] = [];
  breadcrumb: BreadcrumbItem[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service = SERVICE_DATA[id] ?? null;
    this.notFound = !this.service;

    if (this.service) {
      const serviceName = this.translate.instant(`services.${id}.title`);
      document.title = this.translate.instant('detail.title', { serviceName });
      this.breadcrumb = [
        { label: this.translate.instant('header.nav.services'), path: '/' },
        { label: serviceName },
      ];
      this.resolveDocs(id);
      this.translate.onLangChange.subscribe(() => this.resolveDocs(id));
    } else {
      document.title = this.translate.instant('detail.notFound.title') + ' — Sportello Demografico';
    }
  }

  private resolveDocs(id: string): void {
    const raw = this.translate.instant(`services.${id}.detail.docs`);
    this.docs = Array.isArray(raw) ? raw : Object.values(raw as Record<string, string>);
  }
}
