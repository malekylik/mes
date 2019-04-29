import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorizationService: AuthorizationService,
    ) { }

    canActivate(): boolean {
        if (!this.authorizationService.isAuthenticated()) {
            this.router.navigateByUrl('auth');
        }

        return this.authorizationService.isAuthenticated();
    }
}
