import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RuleService } from './services/rule/rule.service';
import { InfoMessageService } from './services/info-message/info-message.service';
import { NavigationService } from './services/navigation/navigation.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  declarations: [],
  providers: [
    RuleService,
    InfoMessageService,
    NavigationService,
  ],
})
export class CoreModule { }
