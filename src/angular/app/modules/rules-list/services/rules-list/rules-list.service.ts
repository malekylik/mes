import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, from } from 'rxjs';
import { Cursor, FilterQuery } from 'mongodb';

import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

interface RulesApi {
  getRules(filterQuery?: FilterQuery<any>, projection?: map<number>): Promise<Cursor<Rule>>;
  getCount(): Promise<number>;
  deleteRule(id: string): Promise<void>;
}

@Injectable()
export class RulesListService {

  private rulesApi: RulesApi;

  constructor(
    private electronService: ElectronService
  ) { 
    this.rulesApi = this.electronService.remote.require('./database/RulesApi').RulesApi;
  }

  loadRules(filterQuery?: FilterQuery<any>): Observable<Cursor<Rule>> {
    return from(this.rulesApi.getRules(filterQuery));
  }

  getRules(skip: number = 0, limit: number = 0, filterQuery?: FilterQuery<any>, projection?: map<number>): Observable<Array<Rule>> {
    return from(
      new Promise<Array<Rule>>(async (resolve) => {
        let limitedCursor: Cursor<Rule> = (await this.rulesApi.getRules(filterQuery, projection))
        .skip(skip)
        .limit(limit);

        if (projection) {
          limitedCursor = limitedCursor.project(projection);
        }

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
