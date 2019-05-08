import { Injectable } from '@angular/core';

import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';
import { Account } from '../../intefraces';

@Injectable()
export class AuthorizationService {

  private authenticationRequest: Promise<boolean> = null;
  private isNewAccountCreatedRequest: Promise<boolean> = null;

  constructor(private indexedDb: IndexedDbService) { }

  isAuthenticated(): Promise<boolean> {
    if (this.authenticationRequest) return this.authenticationRequest;

    const request: Promise<boolean> = this.indexedDb.isLogged();
    this.authenticationRequest = request;

    request.then(() => this.authenticationRequest = null);

    return request;
  }

  isNewAccountCreated(): Promise<boolean> {
    if (this.isNewAccountCreatedRequest) return this.isNewAccountCreatedRequest;

    const request: Promise<boolean> = this.indexedDb.isAccountCreated();
    this.isNewAccountCreatedRequest = request;

    request.then(() => this.isNewAccountCreatedRequest = null);

    return request;
  }

  checkLogin(login: string): Promise<boolean> {
    return this.indexedDb.checkLogin(login);
  }

  checkPassword(password: string): Promise<boolean> {
    return this.indexedDb.checkPassword(password);
  }

  createAccount(account: Account): Promise<boolean> {
    return this.indexedDb.createAccount(account);
  }

  login(): Promise<boolean> {
    return this.indexedDb.login();
  }
}
