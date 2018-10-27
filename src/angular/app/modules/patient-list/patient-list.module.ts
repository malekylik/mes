import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
  ],
  declarations: [ListComponent],
  exports: [
    ListComponent,
  ]
})
export class PatientListModule { }
