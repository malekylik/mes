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

  updateRule(id: string, rule: Rule): Observable<void> {
    return from(this.ruleApi.updateRule(id, rule));
  }

  insertRule(rule: Rule): Observable<void> {
    return from(this.ruleApi.insertRule(rule));
  }

  getRule(id: string): Observable<Rule> {
    return from(this.ruleApi.getRule(id));
  }
}
