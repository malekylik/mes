import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, from } from 'rxjs';

import { Rule } from '../../../../../../electron/interfaces/Rule';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private ruleApi;

  constructor(
    private electronService: ElectronService
  ) { 
    this.ruleApi = this.electronService.remote.require('./database/RulesApi').RulesApi;
  }

  updateRule(rule: Rule): Observable<void> {
    return from(this.ruleApi.insertRule(rule));
  }
}
