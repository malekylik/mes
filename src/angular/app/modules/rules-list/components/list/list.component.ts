import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

import { RulesListService } from '../../services/rules-list/rules-list.service';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  rules: Rule[] = [];
  rulesLoadCount: number = 15;
  rulesCount: number;
  loading: boolean = false;

  private loadMore$: Subject<Observable<Rule[]>> = new Subject();
  private unsubscribe$ = new Subject();
  private projection: map<number> = { "name": 1 };

  constructor(
    private rulesListService: RulesListService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.initTotalCount();
    this.initRulesList();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNext(): void {
    if (this.rules.length < this.rulesCount) {
      this.loading = true;
      this.loadMore$.next(this.rulesListService.getRules(this.rules.length, this.rulesLoadCount, {}, this.projection));
    }
  }

  onDelete(id: string): void {
    this.rulesListService.
      deleteRule(id)
      .subscribe(() => {
        const i: number = this.rules.findIndex((rule) => rule._id.toHexString() === id);

        if (i !== -1) {
          this.rules.splice(i, 1);
        }

        this.rulesCount -= 1;
      });
  }

  private initTotalCount(): void {
    this.rulesListService.getCount()
      .subscribe((count: number) => {
        this.rulesCount = count;

        this.getNext();
      });
  }

  private initRulesList(): void {
    this.loadMore$
      .asObservable()
      .pipe(
        mergeMap(rules => rules),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((rules: Rule[]) => {
        this.rules.push(...rules);
        this.loading = false;
        this.cd.markForCheck();

        if (this.rules.length >= this.rulesCount) {
          this.loadMore$.complete();
        }
      },
        () => { },
        () => { console.log('completed'); }
      );
  }
}
