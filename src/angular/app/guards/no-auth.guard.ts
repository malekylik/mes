import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthorizationService } from 'src/angular/app/modules/authorization/services/authorization/authorization.service';
import { NavigationService } from 'src/angular/app/modules/core/services/navigation/navigation.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorization: AuthorizationService,
        private navigation: NavigationService,
    ) { }

    canActivate(): boolean {
        if (!this.authorization.isAuthenticated()) {
            this.router.navigateByUrl('auth');

            this.navigation.popLink();
        }

        return this.authorization.isAuthenticated();
    }
}
