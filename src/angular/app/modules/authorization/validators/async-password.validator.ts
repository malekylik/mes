import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { PASSWORD, SALT } from '../constants/login';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { CryptoService } from 'src/angular/app/modules/core/services/crypto/crypto.service';

export function AsyncPasswordValidator(authorization: AuthorizationService, crypto: CryptoService): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors> => {
    const isNewAccountCreated = await authorization.isNewAccountCreated();
    const password: string = control.value;
    let isValid: boolean = false;

    if (isNewAccountCreated) {
      isValid = await authorization.checkPassword(password);
    } else {
      const hash: string = crypto.generateHash(password + SALT);
      isValid = hash === PASSWORD;
    }

    return isValid ? null : { [ValidationErrorsKeys.password]: { password } };
  };
} 