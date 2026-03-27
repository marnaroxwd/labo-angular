import { ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
    interface UsernameErrors {
        minlength?: boolean;
        maxlength?: boolean;
        pattern?: boolean;
    }
    return (control) => {
        const value = control.value;

        if (!value) return null;

        const result: UsernameErrors = {};

        if (value.length < 3) {
            result.minlength = true;
        }
        if (value.length > 16) {
            result.maxlength = true;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
            console.log('pattern invalide pour :', value);
            result.pattern = true;
        }

        return Object.keys(result).length > 0 ? result : null;
    };
}
