import { Routes } from "@angular/router";

import { ListComponent } from './components/list/list.component';
import { EditRulePageComponent } from './components/edit-rule-page/edit-rule-page.component';
import { AuthGuard } from '../../guards/auth.guard';
import { NoAuthGuard } from '../../guards/no-auth.guard';

const ROUTES: Routes = [
    { 
        path: 'list',
        children: [
            { path: '',     component: ListComponent },
            { path: 'new',  component: EditRulePageComponent },
            { path: ':id',  component: EditRulePageComponent },
        ],
        canActivate: [NoAuthGuard]
    },
];

export {
    ROUTES
};
