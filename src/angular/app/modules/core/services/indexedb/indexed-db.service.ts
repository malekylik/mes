import { Injectable } from '@angular/core';

import { ServiceWorkerService } from '../service-worker/service-worker.service';
import { SeriveWorkerEvents } from 'src/angular/service-worker/constants/events-type';

@Injectable()
export class IndexedDbService {

  constructor(private serviceWorker: ServiceWorkerService) { }

  isLogged(): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.isLogged);
  }
}
