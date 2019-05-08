import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthorizationService } from 'src/angular/app/modules/authorization/services/authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorization: AuthorizationService,
    ) { }

    async canActivate(): Promise<boolean> {
        const isAuthenticated: boolean = await this.authorization.isAuthenticated();

        if (isAuthenticated) this.router.navigateByUrl('');

        return isAuthenticated;
    }
}
