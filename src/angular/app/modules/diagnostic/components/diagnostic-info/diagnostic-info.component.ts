import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material';

import { map } from 'src/angular/app/utils/interfaces/map';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';
import { Rule } from 'src/electron/interfaces/Rule';

@Component({
  selector: 'app-diagnostic-info',
  templateUrl: './diagnostic-info.component.html',
  styleUrls: ['./diagnostic-info.component.scss']
})
export class DiagnosticInfoComponent implements OnInit {
  step = -1;

  @Input() diagnosticInfo: map<DiagnosisInfo[]> = {};

  private nonSortedData: DiagnosisInfo[] = [];

  constructor() { }

  ngOnInit() {
  }

  setStep(index: number, key: string) {
    this.step = index;
    this.nonSortedData = [...this.diagnosticInfo[key]];
  }

  getRules(rules: Partial<Rule[]>): string {
    let result: string = '';

    for (let i = 0; i < rules.length; i++) {
      if (i !== 0) {
        result += ',';
      }

      result += ` ${rules[i].name}`;
    }

    return result.trim();
  }

  sortData(sort: Sort, ruleName: string) {
    if (sort.direction === '') {
      this.diagnosticInfo[ruleName] = [...this.nonSortedData];
      return;
    }

    const isAsc = sort.direction === 'asc';

    this.diagnosticInfo[ruleName].sort((l, r) => isAsc ? l.count - r.count : r.count - l.count);
  }

}
