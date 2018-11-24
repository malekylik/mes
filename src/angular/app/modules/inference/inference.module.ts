import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InferenceService } from './services/inference/inference.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [InferenceService],
  declarations: []
})
export class InferenceModule { }
