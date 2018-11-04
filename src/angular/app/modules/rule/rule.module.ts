import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleComponent } from './components/rule/rule.component';
import { RulePageComponent } from './components/rule-page/rule-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RuleComponent, RulePageComponent],
  exports: [RulePageComponent]
})
export class RuleModule { }
