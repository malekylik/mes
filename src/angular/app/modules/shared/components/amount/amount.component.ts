import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {

  @Input() currentValue: number = 0;
  @Input() maxValue: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
