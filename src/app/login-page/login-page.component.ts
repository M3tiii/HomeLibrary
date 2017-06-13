import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public error: any;

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {
    this.loginWithUsername({}, 't1', '1');
  }

  loginWithUsername(event, username, password) {
    this.storage.login(username, password).then(res => {
      console.log('Login', res);
      if (!res.error) {
        this.error = null;
        this.storage.saveLocal(res);
        this.storage.isLogged.next(true);
      } else {
        this.error = res.error;
      }
    })
  }
}
