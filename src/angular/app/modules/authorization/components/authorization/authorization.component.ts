import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { ValidationService } from '../../services/validation/validation.service';
import { AsyncLoginValidator, AsyncPasswordValidator } from '../../validators';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Account } from '../../intefraces';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  form: FormGroup;
  loginControl: FormControl;
  passwordControl: FormControl;
  validationLoading: boolean = false;

  @Input() loading: boolean = false;
  @Output() onLogin = new EventEmitter<Account>();

  constructor(
    public validation: ValidationService,
    private authorization: AuthorizationService,
  ) { }

  ngOnInit() {
    this.loginControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      login: this.loginControl,
      password: this.passwordControl,
    });
  }

  login(): void {
    if (this.form.valid) {
      this.validationLoading = true;

      Promise.all([
        ((AsyncLoginValidator(this.authorization)(this.loginControl)) as Promise<ValidationErrors>),
        ((AsyncPasswordValidator(this.authorization)(this.passwordControl)) as Promise<ValidationErrors>),
      ]).then(([loginError, passwordError]) => {

        if (loginError) {
          this.loginControl.setErrors({
            ...this.loginControl.errors,
            ...loginError,
          })
        }

        if (passwordError) {
          this.passwordControl.setErrors({
            ...this.passwordControl.errors,
            ...passwordError,
          })
        }

        if (!loginError && !passwordError) {
          const login: string = this.loginControl.value;
          const password: string = this.passwordControl.value;
          this.onLogin.emit({ login, password });
        }

        this.validationLoading = false;
      });
    }
  }

}
