import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ValidationService } from '../../services/validation/validation.service';
import { Account } from '../../intefraces';

@Component({
  selector: 'app-acount-creation',
  templateUrl: './acount-creation.component.html',
  styleUrls: ['./acount-creation.component.scss']
})
export class AcountCreationComponent implements OnInit {

  form: FormGroup;
  loginControl: FormControl;
  passwordControl: FormControl;
  validationLoading: boolean = false;

  @Input() loading: boolean = false;
  @Output() onCreatAccount = new EventEmitter<Account>();

  constructor(public validation: ValidationService) { }

  ngOnInit() {
    this.loginControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      login: this.loginControl,
      password: this.passwordControl,
    });
  }

  create(): void {
    if (this.form.valid) {
      const login: string = this.loginControl.value;
      const password: string = this.passwordControl.value;

      this.onCreatAccount.emit({ login, password });
    }
  }

}
