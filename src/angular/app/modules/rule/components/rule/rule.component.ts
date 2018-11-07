import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BaseRule } from '../../../../../../electron/interfaces/BaseRule';
import { RuleService } from '../../services/rule/rule.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  ages: any[] = [
    {
      viewValue: 'от 0 до 3',
      value: '0-3'
    },
    {
      viewValue: 'от 3 до 5',
      value: '3-5'
    },
    {
      viewValue: 'от 5 до 12',
      value: '5-12'
    },
    {
      viewValue: 'от 12',
      value: '> 12'
    },
  ];

  Ts: any[] = [
    {
      viewValue: '36.6',
      value: '36.6'
    },
    {
      viewValue: 'от 36.7 до 37.5',
      value: '36.7-37.5'
    },
    {
      viewValue: 'от 37.6 до 38.5',
      value: '37.6-38.5'
    },
    {
      viewValue: 'от 38.5',
      value: '> 38.5'
    },
  ];

  Ls: any[] = [
    {
      viewValue: 'от 4 до 9',
      value: '4-9'
    },
    {
      viewValue: 'от 10 до 15',
      value: '10-15'
    },
    {
      viewValue: 'от 16 до 20',
      value: '16-20'
    },
    {
      viewValue: 'от 21',
      value: '> 20'
    },
  ];

  ts: any[] = [
    {
      viewValue: 'от 0 до 6',
      value: '0-6'
    },
    {
      viewValue: 'от 7 до 12',
      value: '6-12'
    },
    {
      viewValue: 'c 13 до 24',
      value: '13-24'
    },
    {
      viewValue: 'от 25',
      value: '> 24'
    },
  ];

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
      name:       [''],
      age:        [this.ages[0].value],
      T:          [this.Ts[0].value],
      time:       [this.ts[0].value],
      diagnosis:  [''],
      oak: this.fb.group({
        L:  [this.Ls[0].value],
        nf: [0],
        lf: [0],
      }),
    });
  }
}
