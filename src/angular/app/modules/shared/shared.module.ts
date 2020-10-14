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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { AmountComponent } from './components/amount/amount.component';
import { IndeterminateProgressSpinnerComponent } from './components/indeterminate-progress-spinner/indeterminate-progress-spinner.component';
import { TabNavComponent } from './components/tab-nav/tab-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FileLoadingComponent } from './components/file-loading/file-loading.component';
import { LoadingDirective } from './directives/loading.directive';
import { ArrayToStringPipe } from './pipes/array-to-string/array-to-string.pipe';

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
    TabNavComponent,
    FileLoadingComponent,
    LoadingDirective,
    ArrayToStringPipe,
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
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
  ],
  declarations: [
    AmountComponent,
    IndeterminateProgressSpinnerComponent,
    TabNavComponent,
    HeaderComponent,
    FileLoadingComponent,
    LoadingDirective,
    ArrayToStringPipe,
  ],
  entryComponents: [IndeterminateProgressSpinnerComponent],
})
export class SharedModule { }
