import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Rule } from '../../../../../../electron/interfaces/Rule';
import { BaseRule } from '../../../../../../electron/interfaces/BaseRule';
import { Range } from '../../../../utils/range';

enum RuleFormFields {
  id = '_id',
  name = 'name',
  age = 'age',
  time = 'time',
  T = 'T',
  oak = 'oak',
  diagnosis = 'diagnosis',
  creationTime = 'creationTime',
  lastUpdateTime = 'lastUpdateTime',
}

enum OAKFormFields {
  leukocytosis = 'L',
  neutrophilia = 'nf',
  lymphocytosis = 'lf',
}

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
        formValue[RuleFormFields.age],
        formValue[RuleFormFields.time],
        formValue[RuleFormFields.T],
        formValue[RuleFormFields.diagnosis],
        formValue[RuleFormFields.oak],
        this.rule._id ? this.rule.creationTime: null,
      );

      this.save.emit(rule);
    }
  }

  private buildForm(): void {
    this.ruleFormGroup = this.fb.group({
      [RuleFormFields.name]: [this.rule.name],
      [RuleFormFields.age]: [this.rule.age],
      [RuleFormFields.T]: [this.rule.T],
      [RuleFormFields.time]: [this.rule.t],
      [RuleFormFields.diagnosis]: [this.rule.diagnosis],
      [RuleFormFields.oak]: this.fb.group({
        [OAKFormFields.leukocytosis]: [this.rule.oak.L],
        [OAKFormFields.neutrophilia]: [this.rule.oak.nf],
        [OAKFormFields.lymphocytosis]: [this.rule.oak.lf],
      }),
    });
  }
}
