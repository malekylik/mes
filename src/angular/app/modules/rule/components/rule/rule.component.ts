import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BaseRule } from '../../../../../../electron/interfaces/BaseRule';
import { RuleService } from '../../services/rule/rule.service';
import { Range } from '../../../../utils/range';
import { AGES, TS, LS, TIMES } from '../../constants';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  ages: Range[] = AGES;

  Ts: Range[] = TS;

  Ls: Range[] = LS;

  ts: Range[] = TIMES;

  rule: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ruleService: RuleService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSave(): void {
    if (this.rule.valid) {
      this.ruleService.updateRule(new BaseRule(this.rule.value))
        .subscribe(() => { console.log('saved') });
    }
  }

  private buildForm(): void {
    this.rule = this.fb.group({
      name: [''],
      age: [this.ages[0].toString()],
      T: [this.Ts[0].toString()],
      time: [this.ts[0].toString()],
      diagnosis: [''],
      oak: this.fb.group({
        L: [this.Ls[0].toString()],
        nf: [0],
        lf: [0],
      }),
    });
  }
}
