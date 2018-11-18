import { Component, OnInit } from '@angular/core';

import { MAIN_TAB_LINKS } from './constants';
import { TabLink } from './interfaces/tab-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routeLinks: TabLink[] = MAIN_TAB_LINKS;
  activeLinkIndex: number = 0;

  constructor() {}

  ngOnInit() {
  }
}
