import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RulesListService } from '../../services/rules-list/rules-list.service';
import { Rule } from 'src/electron/interfaces/Rule';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rules: Rule[] = [];
  rulesLoadCount: number = 15;
  rulesCount: number;

  rulesCount$: Observable<number>;
  loadMore$: Subject<Observable<Rule[]>> = new Subject();

  constructor(
    private rulesListService: RulesListService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.rulesCount$ = this.rulesListService.getCount();
    this.rulesCount$.subscribe((count: number) => {
      this.rulesCount = count;

      this.getNext();
    });

    this.loadMore$
      .asObservable()
      .pipe(
        mergeMap(rules => rules)
      )
      .subscribe((rules: Rule[]) => {
          this.rules.push(...rules);
          this.cd.markForCheck();

          if (this.rules.length >= this.rulesCount) {
            this.loadMore$.complete();
          }
      },
        () => { },
        () => { console.log('complited'); });
  }

  getNext(): void {
    this.loadMore$.next(this.rulesListService.getRules(this.rules.length, this.rulesLoadCount));
  }
}
