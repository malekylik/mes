import { Routes } from "@angular/router";

import { DiagnosticPageComponent } from './modules/diagnostic/components/diagnostic-page/diagnostic-page.component';
import { RulesListPageComponent } from './modules/rules-list/components/rules-list-page/rules-list-page.component';
import { LoginPageComponent } from './modules/authorization/components/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const ROUTES: Routes = [
    { path: '',   redirectTo: 'diagnostic', pathMatch: 'full', },
    { path: 'auth', component: LoginPageComponent },
    { path: 'diagnostic', component: DiagnosticPageComponent },
    { path: 'list', component: RulesListPageComponent, canActivate: [NoAuthGuard] },
];

export {
    ROUTES
};
