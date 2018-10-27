import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { PatientListModule } from './modules/patient-list/patient-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    PatientListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
