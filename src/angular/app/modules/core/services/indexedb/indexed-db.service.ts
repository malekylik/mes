import { Injectable } from '@angular/core';

import { ServiceWorkerService } from '../service-worker/service-worker.service';
import { SeriveWorkerEvents } from 'src/angular/service-worker/constants/events-type';
import { Account } from 'src/angular/app/modules/authorization/intefraces';

@Injectable()
export class IndexedDbService {

  constructor(private serviceWorker: ServiceWorkerService) { }

  isLogged(): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.isLogged);
  }

  isAccountCreated(): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.isAccountCreated);
  }

  checkLogin(login: string): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.checkLogin, login);
  }

  checkPassword(password: string): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.checkPassword, password);
  }

  createAccount(account: Account): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.createAccount, account);
  }

  login(): Promise<boolean> {
    return this.serviceWorker.sendMessage(SeriveWorkerEvents.login);
  }
}
