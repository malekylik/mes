import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { LoginValidator, PasswordValidator } from '../../validators';
import { ValidationService } from '../../services/validation/validation.service';
import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  host: { class: 'login' },
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  loginControl: FormControl;
  passwordControl: FormControl;

  constructor(
    public validation: ValidationService,
    private indexedDb: IndexedDbService,
    ) { }

  ngOnInit() {
    this.loginControl = new FormControl('', [Validators.required, LoginValidator()]);
    this.passwordControl = new FormControl('', [Validators.required, PasswordValidator()]);

    this.form = new FormGroup({
      login: this.loginControl,
      password: this.passwordControl,
    });
  }

  login(): void {
    if (this.form.valid) {
      const login: string = this.loginControl.value;
      const password: string = this.passwordControl.value;
      this.indexedDb.isLogged().then(isLogged => console.log('login page isLogged', isLogged));
    }
  }

}
