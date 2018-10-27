import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, Observer } from 'rxjs';
import { Cursor } from 'mongodb';

import { Patient } from '../../../../../../electron/interfaces/patient';

@Injectable()
export class PatientsListService {

  constructor(
    private electronService: ElectronService
  ) { }

  getPatients(): Observable<Array<Patient>> {
    const patients: Promise<Cursor<Patient>> = 
    this.electronService.remote.require('./database/PatientsApi').PatientsApi.getPatients();
    
    return Observable.create((o: Observer<Array<Patient>>) => {
      patients.then(async (cursor: Cursor<Patient>) => {
        const patientsPromises: Array<Promise<Patient>> = [];

        while (await cursor.hasNext()) patientsPromises.push(cursor.next());

        o.next(await Promise.all(patientsPromises));
        o.complete();
      });

      patients.catch((err) => { o.error(err) });
    });
  }
}
