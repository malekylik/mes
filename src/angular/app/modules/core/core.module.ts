import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleService } from './services/rule/rule.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [RuleService],
})
export class CoreModule { }
