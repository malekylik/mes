import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginValidator, PasswordValidator, AsyncLoginValidator, AsyncPasswordValidator } from '../../validators';
import { ValidationService } from '../../services/validation/validation.service';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  host: { class: 'login' },
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isNewAccountCreated: boolean = false;
  isLogged: boolean = false;
  loading: boolean = true;

  constructor(
    public validation: ValidationService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private indexedDb: IndexedDbService,
    private authorization: AuthorizationService,
    ) { }

  ngOnInit() {
    this.authorization.isNewAccountCreated()
    .then((isCreated) => {
      // this.isNewAccountCreated = isCreated;
      this.isNewAccountCreated = true;
      this.loading = false;
      // if (isCreated) {
      //   this.router.navigateByUrl('list');
      // } else {
      //   // this.setAuthPage();
      //   this.createAuthForm();
      //   this.pageName = 'Аутентификация';
      //   this.onSubmit = this.login;
      //   this.loading = false;
      // }
    });
  }

  onCreatAccount(account): void {
    console.log('create', account);

    this.isNewAccountCreated = true;
    this.isLogged = false;
  }

  onLogin(account): void {
    if (this.isNewAccountCreated) {
      console.log('login db', account);

    } else {
      this.isLogged = true;
      console.log('login', account);
    }
  }

  // login(): void {
  //   console.log('login fire');
  //   console.log('valid', this.form.valid);
  //   if (this.form.valid) {
  //     console.log('valid pass');
  //     const login: string = this.loginControl.value;
  //     const password: string = this.passwordControl.value;
  //     this.indexedDb.isLogged().then(isLogged => { 
  //       console.log('login page isLogged', isLogged);
  //       this.setNewAccountPage();
  //       this.cd.markForCheck();
  //     });
  //   }
  // }

  // createAccount(): void {
  //   if (this.form.valid) {
  //     console.log('create account');
  //   }
  // }

  // private setAuthPage() {
  //   this.changeForm('Аутентификация', () => this.createAuthForm(), this.login);
  // }

  // private setNewAccountPage() {
  //   this.changeForm('Создание нового аккаунта', () => this.createNewAccoutForm(), this.createAccount);
  // }

  // private changeForm(pageName: PageName, createForm: () => void, onSubmit: () => void) {
  //   createForm();
  //   this.pageName = pageName;
  //   this.onSubmit = onSubmit;
  // }

}
