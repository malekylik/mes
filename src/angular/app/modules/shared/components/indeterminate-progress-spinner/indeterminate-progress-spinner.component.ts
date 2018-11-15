import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indeterminate-progress-spinner',
  templateUrl: './indeterminate-progress-spinner.component.html',
  styleUrls: ['./indeterminate-progress-spinner.component.scss']
})
export class IndeterminateProgressSpinnerComponent implements OnInit {

  @Input() diameter: number = 100;
  @Input() color: string = 'primary';

  constructor() { }

  ngOnInit() {
  }

}
