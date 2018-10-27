import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { PatientsListService } from './services/patients-list/patients-list.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
  ],
  providers: [
    PatientsListService
  ],
  declarations: [ListComponent],
  exports: [
    ListComponent,
  ]
})
export class PatientListModule { }
