import { Routes } from "@angular/router";

import { RulesListPageComponent } from './modules/rules-list/components/rules-list-page/rules-list-page.component';
import { ListComponent } from './modules/rules-list/components/list/list.component';
import { EditRulePageComponent } from './modules/rules-list/components/edit-rule-page/edit-rule-page.component';

const ROUTES: Routes = [
    { path: '',   redirectTo: 'list', pathMatch: 'full' },
    { 
        path: 'list',
        component: RulesListPageComponent,
        children: [
            { path: '',     component: ListComponent },
            { path: 'new',  component: EditRulePageComponent },
            { path: ':id',  component: EditRulePageComponent },
        ],
    },
];

export {
    ROUTES
};
