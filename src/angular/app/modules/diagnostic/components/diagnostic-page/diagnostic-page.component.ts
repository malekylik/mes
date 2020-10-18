import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Rule } from 'src/electron/interfaces/Rule';
import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';
import { RuleFormFields, DiagnosticFormFields, OAKFormFields } from '../../../rule/constants';
import { AGES, TS, LS, TIMES, SEXES, VOMITINGS } from '../../../rule/constants';
import { InferenceService } from '../../../inference/services/inference/inference.service';
import { InfoMessageService } from 'src/angular/app/modules/core/services/info-message/info-message.service';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { map } from 'src/angular/app/utils/interfaces/map';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';
import { GeneralDiagnosisInfo } from 'src/electron/interfaces/GeneralDiagnosisInfo';
import { SOMETHING_WENT_WRONG } from 'src/angular/app/constants';
import { parseCSVToRule } from 'src/angular/app/utils/csv/utils';

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
  vomitings: Range[] = VOMITINGS;
  sexes: FormOption[] = SEXES;
  rule: Rule = null;
  loading: boolean = false;
  diagnosticInfo: map<DiagnosisInfo[]> = null;
  general: GeneralDiagnosisInfo[] = null;

  constructor(
    private fb: FormBuilder,
    private inferenceEngine: InferenceService,
    private infoMessageService: InfoMessageService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onDiagnost(): void {
    if (this.diagnosticFormGroup.valid) {
      this.loading = true;
      this.diagnosticInfo = null;

      const ruleName: string = '';
      const formValue: any = this.diagnosticFormGroup.value;
      const rule: Rule = new BaseRule(
        ruleName,
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.age],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.sex],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.T],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.vomiting],
        formValue[RuleFormFields.diagnosis],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.oak],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.time],
      );

      this.inferenceEngine.inference(rule)
      .subscribe(
        (result: map<DiagnosisInfo[]>) => {
          const d = this.inferenceEngine.getGeneralInfo(result);
          this.diagnosticInfo = result;
          this.general = d;

          this.loading = false;
        },
        () => {
          this.loading = false;
          this.infoMessageService.showMessage(SOMETHING_WENT_WRONG);
        }
      );
    }
  }

  onLoadData(files: FileList) {
    if (files.length > 0) {
      const file = files.item(0);

      const reader = new FileReader();
      reader.onload = (e) => { 
        const fileStr = e.target.result as string;
        const rule = parseCSVToRule(fileStr);

        this.diagnosticFormGroup.setValue({
          [RuleFormFields.diagnostic]: {
            [DiagnosticFormFields.age]: rule.age, 
            [DiagnosticFormFields.T]: rule.T,
            [DiagnosticFormFields.sex]: rule.sex,
            [DiagnosticFormFields.time]: rule.t,
            [DiagnosticFormFields.vomiting]: rule.vomiting,
            [DiagnosticFormFields.oak]: {
              [OAKFormFields.leukocytosis]: rule.oak.L,
              [OAKFormFields.neutrophilia]: rule.oak.nf,
              [OAKFormFields.lymphocytosis]: rule.oak.lf,
            }
          }
        });
      };
      reader.readAsText(file);
    }
  }

  private buildForm(): void {
    this.diagnosticFormGroup = this.fb.group({
      [RuleFormFields.diagnostic]: this.fb.group({
        [DiagnosticFormFields.age]: [null, Validators.required],
        [DiagnosticFormFields.T]: [null, Validators.required],
        [DiagnosticFormFields.sex]: [null, Validators.required],
        [DiagnosticFormFields.time]: [null, Validators.required],
        [DiagnosticFormFields.vomiting]: [null, Validators.required],
        [DiagnosticFormFields.oak]: this.fb.group({
          [OAKFormFields.leukocytosis]: [null, Validators.required],
          [OAKFormFields.neutrophilia]: [null, Validators.required],
          [OAKFormFields.lymphocytosis]: [null, Validators.required],
        })
      })
    });
  }
}
