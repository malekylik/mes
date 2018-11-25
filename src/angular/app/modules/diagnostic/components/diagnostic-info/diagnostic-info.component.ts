import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material';

import { map } from 'src/angular/app/utils/interfaces/map';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';
import { Rule } from 'src/electron/interfaces/Rule';
import { GeneralDiagnosisInfo } from 'src/electron/interfaces/GeneralDiagnosisInfo';

@Component({
  selector: 'app-diagnostic-info',
  templateUrl: './diagnostic-info.component.html',
  styleUrls: ['./diagnostic-info.component.scss']
})
export class DiagnosticInfoComponent implements OnInit {
  step = -1;
  displayedColumns: string[] = ['diagnosis', 'criteriaName', 'count'];

  @Input() diagnosticInfo: map<DiagnosisInfo[]> = {};
  @Input() general: GeneralDiagnosisInfo[] = [];

  private nonSortedData: DiagnosisInfo[] = [];

  constructor() { }

  ngOnInit() {
  }

  setStep(index: number, key: string) {
    if (key !== undefined) {
      this.nonSortedData = [...this.diagnosticInfo[key]];
    }

    this.step = index;
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
