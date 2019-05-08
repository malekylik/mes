import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { PASSWORD } from '../constants/login';
import { AuthorizationService } from '../services/authorization/authorization.service';

export function AsyncPasswordValidator(authorization: AuthorizationService): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors> => {
    const isNewAccountCreated = await authorization.isNewAccountCreated();
    const password: string = control.value;
    let isValid: boolean = false;

    if (isNewAccountCreated) {
      isValid = await authorization.checkPassword(password);
    } else {
      isValid = password === PASSWORD;
    }

    return isValid ? null : { [ValidationErrorsKeys.password]: { password } };
  };
} 