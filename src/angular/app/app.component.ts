import { Component, OnInit } from '@angular/core';
import { Router, GuardsCheckEnd, NavigationCancel, ResolveStart, ResolveEnd, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TabLink } from './interfaces/tab-link';
import { NavigationService } from './modules/core/services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: { class: 'app' },
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routeLinks: TabLink[] = this.navigation.getRouteLinks();
  activeLinkIndex: number = this.navigation.getActiveLinkValue();

  private $activeLinkIndex: Observable<number> = this.navigation.getActiveLink();
  private nextActiveLinkIndex: number = null;

  constructor(private navigation: NavigationService, private router: Router) {}

  ngOnInit() {
    this.$activeLinkIndex.subscribe(linkNumber => this.activeLinkIndex = linkNumber);

    this.router.events.pipe(
      filter(() => this.nextActiveLinkIndex !== null),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => { 
      this.navigation.activateLink(this.nextActiveLinkIndex);

      this.nextActiveLinkIndex = null
    });
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationCancel),
    ).subscribe(() => this.nextActiveLinkIndex = null);
  }

  changeActiveTab(index: number): void {
    const isDifferentIndex: boolean = this.activeLinkIndex !== index;

    this.nextActiveLinkIndex = isDifferentIndex ? index : null;
  }
}
