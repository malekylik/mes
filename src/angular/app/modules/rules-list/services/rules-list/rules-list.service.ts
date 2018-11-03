import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, Observer } from 'rxjs';
import { Cursor, FilterQuery } from 'mongodb';

import { Rule } from '../../../../../../electron/interfaces/rule';

@Injectable()
export class RulesListService {

  private rulesApi;

  constructor(
    private electronService: ElectronService
  ) { 
    this.rulesApi = this.electronService.remote.require('./database/RulesApi').RulesApi;
  }

  getRules(filterQuery?: FilterQuery<any>): Observable<Array<Rule>> {
    const rules: Promise<Cursor<Rule>> = this.rulesApi.getRules(filterQuery);
    
    return Observable.create((o: Observer<Array<Rule>>) => {
      rules.then(async (cursor: Cursor<Rule>) => {
        const rulesPromises: Array<Promise<Rule>> = [];

        while (await cursor.hasNext()) rulesPromises.push(cursor.next());

        o.next(await Promise.all(rulesPromises));
        o.complete();
      });

      rules.catch((err) => { o.error(err) });
    });
  }
}
