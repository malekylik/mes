import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { PASSWORD } from '../constants/login';

export function PasswordValidator(): ValidatorFn {
    return (control: AbstractControl):  ValidationErrors | null => {
        const password: string = control.value;
        const isValid: boolean = password === PASSWORD;

        return isValid ? null : { [ValidationErrorsKeys.password]: { value: password } } ;
    };
}
