import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticPageComponent } from './components/diagnostic-page/diagnostic-page.component';
import { SharedModule } from '../shared/shared.module';
import { RuleModule } from '../rule/rule.module';
import { DiagnosticInfoComponent } from './components/diagnostic-info/diagnostic-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RuleModule,
  ],
  declarations: [DiagnosticPageComponent, DiagnosticInfoComponent],
  exports: [DiagnosticPageComponent],
})
export class DiagnosticModule { }
