import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormGroupDirective } from '@angular/forms';

import { Rule } from 'src/electron/interfaces/Rule';
import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DiagnosticComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() rule: Rule = null;
  @Input() ages: Range[] = [];
  @Input() Ts: Range[] = [];
  @Input() Ls: Range[] = [];
  @Input() ts: Range[] = [];
  @Input() sexes: FormOption[] = [];

  constructor() { }

  ngOnInit() {
  }

}
