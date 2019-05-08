import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginValidator, PasswordValidator, AsyncLoginValidator, AsyncPasswordValidator } from '../../validators';
import { ValidationService } from '../../services/validation/validation.service';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { IndexedDbService } from 'src/angular/app/modules/core/services/indexedb/indexed-db.service';
import { Account } from '../../intefraces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  host: { class: 'login' },
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isNewAccountCreated: boolean = false;
  isLogged: boolean = false;
  requestLoading: boolean = false;
  loading: boolean = true;

  constructor(
    public validation: ValidationService,
    private router: Router,
    private authorization: AuthorizationService,
    ) { }

  ngOnInit() {
    this.authorization.isNewAccountCreated()
    .then((isCreated) => {
      this.isNewAccountCreated = isCreated;
      this.loading = false;
    });
  }

  onCreatAccount(account: Account): void {
    console.log('create', account);

    this.isNewAccountCreated = true;
    this.isLogged = false;
  }

  onLogin(account: Account): void {
    if (this.isNewAccountCreated) {
      this.requestLoading = true;
      setTimeout(() => { 
        this.requestLoading = false;
        this.router.navigateByUrl('list');
        console.log('login db', account);
      }, 1000);

    } else {
      this.isLogged = true;
      console.log('login', account);
    }
  }

}
