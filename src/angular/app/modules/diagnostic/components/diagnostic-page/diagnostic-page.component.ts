import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Rule } from 'src/electron/interfaces/Rule';
import { RuleFormFields, DiagnosticFormFields, OAKFormFields } from '../../../rule/constants';
import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';
import { AGES, TS, LS, TIMES, SEXES } from '../../../rule/constants';
import { InferenceService } from '../../../inference/services/inference/inference.service';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { map } from 'src/angular/app/utils/interfaces/map';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';

@Component({
  selector: 'app-diagnostic-page',
  templateUrl: './diagnostic-page.component.html',
  styleUrls: ['./diagnostic-page.component.scss']
})
export class DiagnosticPageComponent implements OnInit {

  diagnosticFormGroup: FormGroup;

  ages: Range[] = AGES;
  Ts: Range[] = TS;
  Ls: Range[] = LS;
  ts: Range[] = TIMES;
  sexes: FormOption[] = SEXES;
  rule: Rule = null;

  constructor(
    private fb: FormBuilder,
    private inferenceEngine: InferenceService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onDiagnost(): void {
    if (this.diagnosticFormGroup.valid) {
      const formValue: any = this.diagnosticFormGroup.value;
      const rule: Rule = new BaseRule(
        '',
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.age],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.sex],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.T],
        formValue[RuleFormFields.diagnosis],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.oak],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.time],
      );

      this.inferenceEngine.inference(rule).subscribe(
        (result: map<DiagnosisInfo[]>) => {
          console.log(result);

          Object.keys(result).forEach((d: string) => {
            console.log(`${d}: `, result[d]);
          });
        }
      );
    }
  }

  private buildForm(): void {
    this.diagnosticFormGroup = this.fb.group({
      [RuleFormFields.diagnostic]: this.fb.group({
        [DiagnosticFormFields.age]: [null, Validators.required],
        [DiagnosticFormFields.T]: [null, Validators.required],
        [DiagnosticFormFields.sex]: [null, Validators.required],
        [DiagnosticFormFields.time]: [null, Validators.required],
        [DiagnosticFormFields.oak]: this.fb.group({
          [OAKFormFields.leukocytosis]: [null, Validators.required],
          [OAKFormFields.neutrophilia]: [null, Validators.required],
          [OAKFormFields.lymphocytosis]: [null, Validators.required],
        })
      })
    });
  }
}
