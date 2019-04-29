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
import { InferenceModule } from './modules/inference/inference.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    CoreModule,
    RulesListModule,
    SharedModule,
    DiagnosticModule,
    InferenceModule,
    AuthorizationModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
