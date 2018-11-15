import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AmountComponent } from './components/amount/amount.component';
import { IndeterminateProgressSpinnerComponent } from './components/indeterminate-progress-spinner/indeterminate-progress-spinner.component';
import { LoadingDirective } from './directives/loading.directive';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    BrowserAnimationsModule,
    AmountComponent,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IndeterminateProgressSpinnerComponent,
    LoadingDirective,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [AmountComponent, IndeterminateProgressSpinnerComponent, LoadingDirective],
  entryComponents: [IndeterminateProgressSpinnerComponent],
})
export class SharedModule { }
