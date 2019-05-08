import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationService } from '../../services/validation/validation.service';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { NavigationService } from 'src/angular/app/modules/core/services/navigation/navigation.service';
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
    private navigation: NavigationService,
    ) { }

  ngOnInit() {
    this.authorization.isNewAccountCreated()
    .then((isCreated) => {
      this.isNewAccountCreated = isCreated;
      this.loading = false;
    });
  }

  onCreatAccount(account: Account): void {
    this.loading = true;
    this.authorization.createAccount(account).then((isCreated) => {
      this.isNewAccountCreated = isCreated;
      this.isLogged = false;
      this.loading = false;
    });
  }

  onLogin(): void {
    if (this.isNewAccountCreated) {
      this.requestLoading = true;

      this.authorization.login().then(() =>
        this.router.navigateByUrl('list').then(() => { 
          this.requestLoading = false;
          this.navigation.activateLink(1);
        }));
    } else {
      this.isLogged = true;
    }
  }

}
