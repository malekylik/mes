import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Rule } from 'src/electron/interfaces/Rule';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { RuleService } from '../../../core/services/rule/rule.service';
import { Range } from '../../../../utils/range';
import { setFactory } from '../../../../utils/set-factory';
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

  rule: Rule = null;

  constructor(
    private ruleService: RuleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const ID: string = 'id';

    this.activatedRoute.params
      .subscribe((params) => {
        const id: string = params[ID] || null;

        if (id) {
          this.ruleService.getRule(id)
          .subscribe((rule: Rule) => { 
            console.log(rule);
            this.rule = rule; 
          });
        } else {
          this.rule = new BaseRule(
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
          );
        }
      });
  }

  onSave(rule: Rule): void {
    let updateRule$: Observable<void>;

    if (this.rule._id) {
      updateRule$ = this.ruleService.updateRule(this.rule._id.toHexString(), setFactory(rule));
    } else {
      updateRule$ = this.ruleService.insertRule(rule);
    }

    updateRule$.subscribe(() => { console.log('saved') });
  }

}
