import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Rule } from 'src/electron/interfaces/Rule';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';
import { RuleFormFields, DiagnosticFormFields, OAKFormFields} from '../../constants';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  ruleFormGroup: FormGroup;

  @Input() rule: Rule = null;
  @Input() ages: Range[] = [];
  @Input() Ts: Range[] = [];
  @Input() Ls: Range[] = [];
  @Input() ts: Range[] = [];
  @Input() vomitings: Range[] = [];
  @Input() sexes: FormOption[] = [];

  @Output() save: EventEmitter<Rule> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSave(): void {
    if (this.ruleFormGroup.valid) {
      const formValue: any = this.ruleFormGroup.value;
      const rule: Rule = new BaseRule(
        formValue[RuleFormFields.name],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.age],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.sex],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.T],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.vomiting],
        formValue[RuleFormFields.diagnosis],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.oak],
        formValue[RuleFormFields.diagnostic][DiagnosticFormFields.time],
        this.rule._id ? this.rule.creationTime: null,
      );

      this.save.emit(rule);
    }
  }

  private buildForm(): void {
    this.ruleFormGroup = this.fb.group({
      [RuleFormFields.name]: [this.rule.name, Validators.required],
      [RuleFormFields.diagnostic]: this.fb.group({
        [DiagnosticFormFields.age]: [this.rule.age, Validators.required],
        [DiagnosticFormFields.T]: [this.rule.T, Validators.required],
        [DiagnosticFormFields.sex]: [this.rule.sex, Validators.required],
        [DiagnosticFormFields.time]: [this.rule.t, Validators.required],
        [DiagnosticFormFields.vomiting]: [this.rule.vomiting, Validators.required],
        [DiagnosticFormFields.oak]: this.fb.group({
          [OAKFormFields.leukocytosis]: [this.rule.oak.L, Validators.required],
          [OAKFormFields.neutrophilia]: [this.rule.oak.nf, Validators.required],
          [OAKFormFields.lymphocytosis]: [this.rule.oak.lf, Validators.required],
        }),
      }),
      [RuleFormFields.diagnosis]: [this.rule.diagnosis, Validators.required],
    });
  }
}
