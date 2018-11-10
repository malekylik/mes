import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, from } from 'rxjs';

import { Rule } from 'src/electron/interfaces/Rule';

@Injectable()
export class RuleService {

  private ruleApi;

  constructor(
    private electronService: ElectronService
  ) { 
    this.ruleApi = this.electronService.remote.require('./database/RuleApi').RuleApi;
  }

  updateRule(rule: Rule): Observable<void> {
    // if (rule._id) {
    //   return from(this.ruleApi.)
    // }

    return from(this.ruleApi.insertRule(rule));
  }
}
