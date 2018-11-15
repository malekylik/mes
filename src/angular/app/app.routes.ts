import { Routes } from "@angular/router";

import { RulesListPageComponent } from './modules/rules-list/components/rules-list-page/rules-list-page.component';

const ROUTES: Routes = [
    { path: '',   redirectTo: 'diagnostic', pathMatch: 'full' },
    { path: 'list', component: RulesListPageComponent },
    { path: 'diagnostic', component: RulesListPageComponent },
];

export {
    ROUTES
};
