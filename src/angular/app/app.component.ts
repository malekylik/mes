import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TabLink } from './interfaces/tab-link';
import { NavigationService } from './modules/core/services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routeLinks: TabLink[] = this.navigation.getRouteLinks();
  activeLinkIndex: number = this.navigation.getActiveLinkValue();

  private $activeLinkIndex: Observable<number> = this.navigation.getActiveLink();

  constructor(private navigation: NavigationService) {}

  ngOnInit() {
    this.$activeLinkIndex.subscribe(linkNumber => this.activeLinkIndex = linkNumber);
  }

  changeActiveTab(index: number): void {
    this.navigation.activateLink(index);
  }
}
