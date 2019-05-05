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

  private stackStart: number;
  private stackEnd: number;
  private navigationStack: NavigationStackItem[];

  constructor() { 
    this.stackStart = 0;
    this.stackEnd = 0;

    this.navigationStack = new Array(10);
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

  setActiveLinkValue(index: number): number {
    return this.changeActiveLink(index);
  }

  activateLink(index: number): number {
    this.pushLink(this.activeLinkIndex, this.routeLinks[this.activeLinkIndex]);

    return this.changeActiveLink(index);
  }

  pushLink(index: number, link: TabLink): void {
    let { stackStart, stackEnd } = this;

    this.navigationStack[stackEnd] = {
      activeTab: index,
      link: link,
    };

    stackEnd = (stackEnd + 1) % 10;

    if ((stackEnd + 1) % 10 === stackStart) stackStart = (stackStart + 1) % 10;

    this.stackStart = stackStart;
    this.stackEnd = stackEnd;
  }

  popLink(): TabLink {
    const { stackStart } = this;
    let { stackEnd } = this;

    if (stackStart === stackEnd) return null;

    stackEnd = ((stackEnd - 1) + 10) % 10;

    const stackItem: NavigationStackItem = this.navigationStack[stackEnd];

    this.stackEnd = stackEnd;
    this.changeActiveLink(stackItem.activeTab);

    return stackItem.link;
  }

  private changeActiveLink(index: number): number {
    this.activeLinkIndex = index
    this.$activeLinkIndex.next(index);

    return index;
  }
}
