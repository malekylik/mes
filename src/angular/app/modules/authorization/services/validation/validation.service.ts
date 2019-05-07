import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../../constants/error';

@Injectable()
export class ValidationService {

  constructor() { }

  validate(errors: ValidationErrors | null): string {
    if (!errors) return '';

    if (errors[ValidationErrorsKeys.required]) {
      return 'Поле не может быть пустым';
    } else if (errors[ValidationErrorsKeys.login]) {
      const error = errors[ValidationErrorsKeys.login];

      return `${error.login} - неправильный логин`;
    } else if (errors[ValidationErrorsKeys.password]) {
      const error = errors[ValidationErrorsKeys.password];

      return `${error.password} - неправильный пароль`;
    }

    return 'Error';
  }
}
