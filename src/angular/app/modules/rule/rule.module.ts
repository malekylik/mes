import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RuleComponent } from './components/rule/rule.component';
import { RulePageComponent } from './components/rule-page/rule-page.component';
import { RuleService } from './services/rule/rule.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [RuleComponent, RulePageComponent],
  providers: [RuleService],
  exports: [RulePageComponent]
})
export class RuleModule { }
