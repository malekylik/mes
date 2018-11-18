import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { RulesListModule } from './modules/rules-list/rules-list.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { DiagnosticModule } from './modules/diagnostic/diagnostic.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    CoreModule,
    RulesListModule,
    SharedModule,
    DiagnosticModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
