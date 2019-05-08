import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { LOGIN } from '../constants/login';
import { AuthorizationService } from '../services/authorization/authorization.service';

export function AsyncLoginValidator(authorization: AuthorizationService): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors> => {
    const isNewAccountCreated = await authorization.isNewAccountCreated();
    const login: string = control.value;
    let isValid: boolean = false;

    if (isNewAccountCreated) {
      isValid = await authorization.checkLogin(login);
    } else {
      isValid = login === LOGIN;
    }

    return isValid ? null : { [ValidationErrorsKeys.login]: { login } };
  };
} 
