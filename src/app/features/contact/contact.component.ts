import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { StatusMessageComponent } from '../../shared/components/status-message/status-message.component';
import { getErrorMessage, italianPhoneValidator, noWhitespaceValidator } from '../../shared/validators/form.validators';

const REQUEST_TYPES = [
  { value: 'residency-certificate', label: 'Residency Certificate' },
  { value: 'family-status', label: 'Family Status Certificate' },
  { value: 'identity-card', label: 'Identity Card' },
  { value: 'other', label: 'Other enquiry' },
] as const;

@Component({
  selector: 'pcw-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, StatusMessageComponent, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);

  @ViewChild('errorSummary') errorSummaryRef?: ElementRef<HTMLDivElement>;

  readonly requestTypes = REQUEST_TYPES;

  submitted = false;
  submitSuccess = false;
  submitError = false;
  hasAttemptedSubmit = false;

  form!: FormGroup;

  ngOnInit(): void {
    document.title = this.translate.instant('contact.title');

    this.form = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(2), noWhitespaceValidator()],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(2), noWhitespaceValidator()],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      phone: [
        '',
        [italianPhoneValidator()],
      ],
      requestType: [
        '',
        [Validators.required],
      ],
      message: [
        '',
        [Validators.required, Validators.minLength(20), Validators.maxLength(1000), noWhitespaceValidator()],
      ],
      privacyConsent: [
        false,
        [Validators.requiredTrue],
      ],
    });
  }

  showError(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false;
    return control.invalid && (control.touched || this.hasAttemptedSubmit);
  }

  getError(controlName: string, labelKey: string): string {
    return getErrorMessage(this.form.get(controlName), this.translate.instant(labelKey));
  }

  get summaryErrors(): { field: string; label: string; message: string }[] {
    const fields: { name: string; labelKey: string }[] = [
      { name: 'firstName',      labelKey: 'contact.form.firstName.label' },
      { name: 'lastName',       labelKey: 'contact.form.lastName.label' },
      { name: 'email',          labelKey: 'contact.form.email.label' },
      { name: 'phone',          labelKey: 'contact.form.phone.label' },
      { name: 'requestType',    labelKey: 'contact.form.requestType.label' },
      { name: 'message',        labelKey: 'contact.form.message.label' },
      { name: 'privacyConsent', labelKey: 'contact.form.privacy.policyLink' },
    ];

    return fields
      .filter(f => {
        const c = this.form.get(f.name);
        return c?.invalid;
      })
      .map(f => ({
        field: f.name,
        label: this.translate.instant(f.labelKey),
        message: getErrorMessage(this.form.get(f.name), this.translate.instant(f.labelKey)),
      }));
  }

  onSubmit(): void {
    this.hasAttemptedSubmit = true;

    if (this.form.invalid) {
      setTimeout(() => {
        this.errorSummaryRef?.nativeElement.focus();
      }, 50);
      return;
    }

    this.submitted = true;
    setTimeout(() => {
      this.submitSuccess = true;
      this.submitted = false;
      this.form.reset();
      this.hasAttemptedSubmit = false;
    }, 1000);
  }
}
