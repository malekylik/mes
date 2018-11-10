import { Component, OnInit } from '@angular/core';

import { Rule } from 'src/electron/interfaces/Rule';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { RuleService } from '../../../core/services/rule/rule.service';
import { Range } from '../../../../utils/range';
import { AGES, TS, LS, TIMES } from '../../../rule/constants';

@Component({
  selector: 'app-edit-rule-page',
  templateUrl: './edit-rule-page.component.html',
  styleUrls: ['./edit-rule-page.component.scss']
})
export class EditRulePageComponent implements OnInit {

  ages: Range[] = AGES;
  Ts: Range[] = TS;
  Ls: Range[] = LS;
  ts: Range[] = TIMES;

  rule: Rule = new BaseRule(
    '',
    this.ages[0].toString(),
    this.ts[0].toString(),
    this.Ts[0].toString(),
    '',
    {
      L: this.Ls[0].toString(),
      nf: 0,
      lf: 0,
    },
  )

  constructor(private ruleService: RuleService) { }

  ngOnInit() {
  }

  onSave(rule: Rule): void {
    this.ruleService.updateRule(rule)
    .subscribe(() => { console.log('saved') });
  }

}
