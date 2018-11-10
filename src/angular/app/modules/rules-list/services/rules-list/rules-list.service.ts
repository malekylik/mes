import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, from } from 'rxjs';
import { Cursor, FilterQuery } from 'mongodb';

import { Rule } from 'src/electron/interfaces/Rule';

@Injectable()
export class RulesListService {

  private rulesApi;

  constructor(
    private electronService: ElectronService
  ) { 
    this.rulesApi = this.electronService.remote.require('./database/RulesApi').RulesApi;
  }

  loadRules(filterQuery?: FilterQuery<any>): Observable<Cursor<Rule>> {
    return from(this.rulesApi.getRules(filterQuery));
  }

  getRules(skip: number = 0, limit: number = 0, filterQuery?: FilterQuery<any>): Observable<Array<Rule>> {
    return from(
      new Promise(async (resolve) => {
        const limitedCursor: Cursor<Rule> = (await this.rulesApi.getRules(filterQuery))
        .skip(skip)
        .limit(limit);
  
        const rulesPromises: Promise<Rule>[] = [];
  
        while (await limitedCursor.hasNext()) rulesPromises.push(limitedCursor.next());
  
        resolve(await Promise.all(rulesPromises));
      })
    );
  }

  getCount(): Observable<number> {
    return from(this.rulesApi.getCount());
  }

  deleteRule(id: string): Observable<void> {
    return from(this.rulesApi.deleteRule(id));
  }
}
