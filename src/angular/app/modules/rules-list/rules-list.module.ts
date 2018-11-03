import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { RulesListService } from './services/rules-list/rules-list.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
  ],
  providers: [
    RulesListService
  ],
  declarations: [ListComponent],
  exports: [
    ListComponent,
  ]
})
export class RulesListModule { }
