import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  public error: any;

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {

  }

  register(event, username, email, password) {
    event.preventDefault();
    this.storage.registerUser(username, password, email).then(res => {
      console.log('Register', res);
      if (!res.error) {
        this.error = null;
        this.storage.saveLocal(res);
        this.storage.isLogged.next(true);
        this.router.navigate(['']);
      } else {
        this.error = res.error;
      }
    });
  }
}
