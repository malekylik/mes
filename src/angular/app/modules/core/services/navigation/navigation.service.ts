import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { TabLink } from 'src/angular/app/interfaces/tab-link';
import { MAIN_TAB_LINKS } from 'src/angular/app/constants';

export interface NavigationStackItem {
  link: TabLink;
  activeTab: number;
}

@Injectable()
export class NavigationService {
  private routeLinks: TabLink[] = MAIN_TAB_LINKS;
  private activeLinkIndex: number = 0;
  private $activeLinkIndex: Subject<number> = new Subject();

  constructor() { 
    this.changeActiveLink(0);
  }

  getRouteLinks(): TabLink[] {
    return this.routeLinks;
  }

  getActiveLink(): Observable<number> {
    return this.$activeLinkIndex.asObservable();
  }

  getActiveLinkValue(): number {
    return this.activeLinkIndex;
  }

  activateLink(index: number): number {
    return this.changeActiveLink(index);
  }

  private changeActiveLink(index: number): number {
    this.activeLinkIndex = index
    this.$activeLinkIndex.next(index);

    return index;
  }
}
