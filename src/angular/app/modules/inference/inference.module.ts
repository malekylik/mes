import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InferenceService } from './services/inference/inference.service';
import { ExplanationService } from './services/explanation/explanation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [InferenceService, ExplanationService],
  declarations: []
})
export class InferenceModule { }
