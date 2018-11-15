import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RuleComponent } from './components/rule/rule.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [RuleComponent],
  providers: [],
  exports: [RuleComponent]
})
export class RuleModule { }
