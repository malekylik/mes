import { Injectable } from '@angular/core';

import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';

@Injectable()
export class AuthorizationService {

  private authenticationRequest: Promise<boolean> = null;

  constructor(private indexedDb: IndexedDbService) { }

  isAuthenticated(): Promise<boolean> {
    if (this.authenticationRequest) return this.authenticationRequest;

    const request: Promise<boolean> = this.indexedDb.isLogged();
    this.authenticationRequest = request;

    request.then(() => this.authenticationRequest = null);

    return request;
  }
}
