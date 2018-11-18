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
import { MatTabsModule } from '@angular/material/tabs';

import { AmountComponent } from './components/amount/amount.component';
import { IndeterminateProgressSpinnerComponent } from './components/indeterminate-progress-spinner/indeterminate-progress-spinner.component';
import { LoadingDirective } from './directives/loading.directive';
import { TabNavComponent } from './components/tab-nav/tab-nav.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
  ],
  exports: [
    AmountComponent,
    IndeterminateProgressSpinnerComponent,
    HeaderComponent,
    LoadingDirective,
    TabNavComponent,
    BrowserAnimationsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
  ],
  declarations: [
    AmountComponent,
    IndeterminateProgressSpinnerComponent,
    LoadingDirective,
    TabNavComponent,
    HeaderComponent,
  ],
  entryComponents: [IndeterminateProgressSpinnerComponent],
})
export class SharedModule { }
