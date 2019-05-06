import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { LOGIN } from '../constants/login';

export function LoginValidator(): ValidatorFn {
    return (control: AbstractControl):  ValidationErrors | null => {
        const login: string = control.value;
        const isValid: boolean = login === LOGIN;

        return isValid ? null : { [ValidationErrorsKeys.login]: { login } } ;
    };
}
