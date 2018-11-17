import { Routes } from "@angular/router";

import { DiagnosticPageComponent } from './modules/diagnostic/components/diagnostic-page/diagnostic-page.component';
import { RulesListPageComponent } from './modules/rules-list/components/rules-list-page/rules-list-page.component';

const ROUTES: Routes = [
    { path: '',   redirectTo: 'diagnostic', pathMatch: 'full' },
    { path: 'diagnostic', component: DiagnosticPageComponent },
    { path: 'list', component: RulesListPageComponent },
];

export {
    ROUTES
};
