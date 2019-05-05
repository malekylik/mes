import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import  { TabLink } from 'src/angular/app/interfaces/tab-link'

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit {

  @Input() routeLinks: TabLink[] = [];
  @Input() activeLinkIndex: number = 0;

  @Output() activeLinkIndexChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onIndexChanged(index: number): void {
    this.activeLinkIndexChange.emit(index);
  }

}
