import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { RulesListService } from '../../services/rules-list/rules-list.service';
import { Rule } from 'src/electron/interfaces/rule';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rules: Rule[] = [];

  constructor(
    private rulesListService: RulesListService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.rulesListService.getRules().subscribe((rules) => {
      this.rules.push(...rules);
      this.cd.detectChanges();
    });
  }

}
