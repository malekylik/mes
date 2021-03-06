import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RuleModule } from '../rule/rule.module';
import { ListComponent } from './components/list/list.component';
import { RulesListService } from './services/rules-list/rules-list.service';
import { RulesListPageComponent } from './components/rules-list-page/rules-list-page.component';
import { EditRulePageComponent } from './components/edit-rule-page/edit-rule-page.component';
import { ROUTES } from './rules-list.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RuleModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    RulesListService
  ],
  declarations: [ListComponent, RulesListPageComponent, EditRulePageComponent],
  exports: [
    RulesListPageComponent,
  ]
})
export class RulesListModule { }
