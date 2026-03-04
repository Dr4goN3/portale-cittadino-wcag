import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom form validators
 *
 * All validators return a ValidationErrors object keyed by the error type,
 * with a human-readable message property used to build accessible inline
 * error messages (WCAG 3.3.1 Error Identification, 3.3.3 Error Suggestion).
 */

/**
 * italianPhoneValidator
 * Accepts Italian mobile (+39 / 39 / 0 prefix) and landline numbers.
 * Optional field: passes when empty (combine with Validators.required if needed).
 */
export function italianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string)?.trim();
    if (!value) return null; // optional field — skip validation when empty

    const pattern = /^(?:\+39|0039)?[\s.-]?(?:3\d{2}|0\d{1,3})[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;

    return pattern.test(value)
      ? null
      : {
          italianPhone: {
            message: 'Enter a valid Italian phone number (e.g. +39 333 1234567)',
          },
        };
  };
}

/**
 * noWhitespaceValidator
 * Ensures the field contains at least one non-whitespace character.
 * Prevents entries like "   " (spaces only) that pass Validators.required.
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const isWhitespace = (value ?? '').trim().length === 0;

    return isWhitespace
      ? { whitespace: { message: 'This field must not contain only spaces.' } }
      : null;
  };
}

/**
 * getErrorMessage
 * Resolves the first validation error on a control into a readable string.
 * Used by templates to render inline error messages linked via aria-describedby.
 *
 * WCAG 3.3.1 Error Identification — error described in human-readable text
 * WCAG 3.3.3 Error Suggestion     — message guides the user toward the fix
 */
export function getErrorMessage(control: AbstractControl | null, fieldName: string): string {
  if (!control || !control.errors) return '';

  const errors = control.errors;

  if (errors['required'])      return `${fieldName} is required.`;
  if (errors['email'])         return `Enter a valid email address (e.g. name@example.com).`;
  if (errors['minlength']) {
    const req = errors['minlength'].requiredLength as number;
    return `${fieldName} must be at least ${req} characters long.`;
  }
  if (errors['maxlength']) {
    const max = errors['maxlength'].requiredLength as number;
    return `${fieldName} must not exceed ${max} characters.`;
  }
  if (errors['italianPhone'])  return errors['italianPhone'].message as string;
  if (errors['whitespace'])    return errors['whitespace'].message as string;

  return `${fieldName} is not valid.`;
}
