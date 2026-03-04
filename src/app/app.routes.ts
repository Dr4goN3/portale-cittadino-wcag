import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Home — citizen services catalogue
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomepageComponent),
  },
  {
    // Service detail — structured information per service
    path: 'services/:id',
    loadComponent: () =>
      import('./features/service-detail/service-detail.component').then(
        m => m.ServiceDetailComponent
      ),
  },
  {
    // Contact form — accessible reactive form
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        m => m.ContactFormComponent
      ),
  },
  {
    // Wildcard — redirect unknown paths to home
    path: '**',
    redirectTo: '',
  },
];

