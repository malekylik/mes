import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ValidationService } from '../../services/validation/validation.service';
import { LoginValidator, PasswordValidator } from '../../validators';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  form: FormGroup;
  loginControl: FormControl;
  passwordControl: FormControl;

  @Output() onLogin = new EventEmitter<any>();

  constructor(public validation: ValidationService) { }

  ngOnInit() {
    this.loginControl = new FormControl('', {
      // validators: [Validators.required],
      validators: [Validators.required, LoginValidator()],
      // asyncValidators: [AsyncLoginValidator(this.indexedDb)],
      updateOn: 'submit'
    });
    this.passwordControl = new FormControl('', {
      // validators: [Validators.required],
      validators: [Validators.required, PasswordValidator()],
      // asyncValidators: [AsyncPasswordValidator(this.indexedDb)],
      updateOn: 'submit'
    });

    this.form = new FormGroup({
      login: this.loginControl,
      password: this.passwordControl,
    });
  }

  login(): void {
    if (this.form.valid) {
      console.log('valid pass');
      const login: string = this.loginControl.value;
      const password: string = this.passwordControl.value;
      this.onLogin.emit({ login, password });
    }
  }

}
