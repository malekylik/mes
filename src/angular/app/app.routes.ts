import { Routes } from "@angular/router";

import { RulesListPageComponent } from './modules/rules-list/components/rules-list-page/rules-list-page.component';
import { ListComponent } from './modules/rules-list/components/list/list.component';
import { RulePageComponent } from './modules/rule/components/rule-page/rule-page.component';

const ROUTES: Routes = [
    { path: '',   redirectTo: 'list', pathMatch: 'full' },
    { 
        path: 'list',
        component: RulesListPageComponent,
        children: [
            { path: '',     component: ListComponent },
            { path: 'new',  component: RulePageComponent },
        ],
    },
];

export {
    ROUTES
};
