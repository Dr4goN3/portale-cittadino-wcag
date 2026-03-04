import { Component, inject, OnInit, DOCUMENT } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { SkipLinkComponent } from './core/skip-link/skip-link.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'pcw-root',
  standalone: true,
  imports: [RouterOutlet, SkipLinkComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.translate.addLangs(['it', 'en']);
    this.translate.setDefaultLang('it');
    const browserLang = this.translate.getBrowserLang();
    const activeLang = browserLang?.match(/it|en/) ? browserLang : 'it';
    this.translate.use(activeLang);

    // Keep html[lang] and meta description in sync with the active language
    this.translate.onLangChange.subscribe(({ lang }) => {
      this.document.documentElement.lang = lang;
      this.translate.get('meta.description').subscribe((desc: string) => {
        this.meta.updateTag({ name: 'description', content: desc });
      });
    });
  }
}

