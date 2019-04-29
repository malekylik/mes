import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

  constructor() { }

  isAuthenticated(): boolean {
    return false;
  }
}
