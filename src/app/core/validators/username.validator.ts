import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const result: ValidationErrors = {};

        if (value.length < 3) {
            // On renvoie un objet avec requiredLength pour matcher le standard Angular
            result['minlength'] = { requiredLength: 3, actualLength: value.length };
        }
        if (value.length > 16) {
            result['maxlength'] = { requiredLength: 16, actualLength: value.length };
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
            result['pattern'] = true;
        }

        return Object.keys(result).length > 0 ? result : null;
    };
}