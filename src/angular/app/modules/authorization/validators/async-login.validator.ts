import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { LOGIN } from '../constants/login';
import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';

export function AsyncLoginValidator(indexedDb: IndexedDbService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors> => {
    const login: string = control.value;
    const isValid: boolean = login === LOGIN;

    return Promise.resolve(isValid ? null : { [ValidationErrorsKeys.login]: { login } });
  };
} 
