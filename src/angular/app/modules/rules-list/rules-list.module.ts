import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RuleModule } from '../rule/rule.module';
import { ListComponent } from './components/list/list.component';
import { RulesListService } from './services/rules-list/rules-list.service';
import { RulesListPageComponent } from './components/rules-list-page/rules-list-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RuleModule,
  ],
  providers: [
    RulesListService
  ],
  declarations: [ListComponent, RulesListPageComponent],
  exports: [
    RulesListPageComponent,
  ]
})
export class RulesListModule { }
