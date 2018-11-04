import { Routes } from "@angular/router";

import { RulesListPageComponent } from './modules/rules-list/components/rules-list-page/rules-list-page.component';

const ROUTES: Routes = [
    { path: './list', component: RulesListPageComponent },
    { path: '',   redirectTo: './list', pathMatch: 'full' },
];

export {
    ROUTES
};
