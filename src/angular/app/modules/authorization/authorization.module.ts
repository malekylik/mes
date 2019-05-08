import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ValidationService } from './services/validation/validation.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { AcountCreationComponent } from './components/acount-creation/acount-creation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    AuthorizationService,
    ValidationService,
  ],
  declarations: [LoginPageComponent, AuthorizationComponent, AcountCreationComponent],
})
export class AuthorizationModule { }
