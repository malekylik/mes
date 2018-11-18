import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RuleComponent } from './components/rule/rule.component';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [RuleComponent, DiagnosticComponent],
  providers: [],
  exports: [RuleComponent, DiagnosticComponent]
})
export class RuleModule { }
