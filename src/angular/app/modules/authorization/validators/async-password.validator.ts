import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../constants/error';
import { PASSWORD } from '../constants/login';
import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';

export function AsyncPasswordValidator(indexedDb: IndexedDbService): AsyncValidatorFn {
    return (control: AbstractControl):  Promise<ValidationErrors> => {
        const password: string = control.value;
        const isValid: boolean = password === PASSWORD;

        return Promise.resolve(isValid ? null : { [ValidationErrorsKeys.password]: { password } });
    };
}
