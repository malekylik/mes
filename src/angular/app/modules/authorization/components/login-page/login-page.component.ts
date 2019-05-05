import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor() { }

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
      const login: string = this.loginControl.value;
      const password: string = this.passwordControl.value;
    }
  }

}
