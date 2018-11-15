import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Rule } from 'src/electron/interfaces/Rule';
import { BaseRule } from 'src/electron/interfaces/BaseRule';
import { setFactory } from 'src/angular/app/utils/set-factory';
import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';
import { RuleService } from '../../../core/services/rule/rule.service';
import { AGES, TS, LS, TIMES, SEXES } from '../../../rule/constants';

@Component({
  selector: 'app-edit-rule-page',
  templateUrl: './edit-rule-page.component.html',
  styleUrls: ['./edit-rule-page.component.scss']
})
export class EditRulePageComponent implements OnInit, OnDestroy {

  ages: Range[] = AGES;
  Ts: Range[] = TS;
  Ls: Range[] = LS;
  ts: Range[] = TIMES;
  sexes: FormOption[] = SEXES;

  rule: Rule = null;
  heading: string = '';

  private unsubscribe$ = new Subject(); 

  constructor(
    private ruleService: RuleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const ID: string = 'id';

    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((params) => {
        const id: string = params[ID] || null;

        if (id) {
          this.heading = 'Редактирование';

          this.ruleService.getRule(id)
          .subscribe((rule: Rule) => { 
            this.rule = rule; 
          });
        } else {
          this.heading = 'Создание';

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
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
