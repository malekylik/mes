import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthorizationService } from 'src/angular/app/modules/authorization/services/authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorizationService: AuthorizationService,
    ) { }

    canActivate(): boolean {
        if (this.authorizationService.isAuthenticated()) {
            this.router.navigateByUrl('');
        }

        return this.authorizationService.isAuthenticated();
    }
}
