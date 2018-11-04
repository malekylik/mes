import { Routes } from "@angular/router";

import { RulePageComponent } from '../rule/components/rule-page/rule-page.component';
import { ListComponent } from './components/list/list.component';

const ROUTES: Routes = [
    { 
        path: 'list',
        children: [
            { path: '',       component: ListComponent },
            { path: 'create', component: RulePageComponent },
        ]
    },
];

export {
    ROUTES
};
