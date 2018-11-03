import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AmountComponent } from './components/amount/amount.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    AmountComponent,
  ],
  declarations: [AmountComponent]
})
export class SharedModule { }
