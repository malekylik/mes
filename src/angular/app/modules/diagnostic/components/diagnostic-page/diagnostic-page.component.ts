import { Component, OnInit } from '@angular/core';

import { Rule } from 'src/electron/interfaces/Rule';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';
import { AGES, TS, LS, TIMES, SEXES } from '../../../rule/constants';

@Component({
  selector: 'app-diagnostic-page',
  templateUrl: './diagnostic-page.component.html',
  styleUrls: ['./diagnostic-page.component.scss']
})
export class DiagnosticPageComponent implements OnInit {

  ages: Range[] = AGES;
  Ts: Range[] = TS;
  Ls: Range[] = LS;
  ts: Range[] = TIMES;
  sexes: FormOption[] = SEXES;
  rule: Rule = null;

  constructor() { }

  ngOnInit() {
    this.rule = new BaseRule(
      '',
      this.ages[0].toString(),
      this.sexes[0].value,
      this.Ts[0].toString(),
      '',
      {
        L: this.Ls[0].toString(),
        nf: 0,
        lf: 0,
      },
      this.ts[0].toString(),
    );
  }
}
