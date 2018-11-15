import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { RulesListModule } from './modules/rules-list/rules-list.module';
import { ROUTES } from './app.routes';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RulesListModule,
    SharedModule,
    NgxElectronModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
