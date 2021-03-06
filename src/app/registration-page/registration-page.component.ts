import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  public error: any;

  constructor(private storage: StorageService, private router: Router) { }

  private register(event, username, email, password) {
    if (username.replace(/ /g, "").length > 0 && email.replace(/ /g, "").length > 0 && password.replace(/ /g, "").length > 0) {
      event.preventDefault();
      this.storage.registerUser(username, password, email).then(res => {
        console.log('Register', res);
        if (!res.error) {
          this.error = 'The accept message was sent to your mail.';
          //this.storage.saveLocal(res);
          //this.storage.isLogged.next(true);
          // this.router.navigate(['/login']);
        } else {
          this.error = res.error;
        }
      });
    } else {
      this.error = "Username, email or password cannot be blank."
    }
  }

  ngOnInit() {

  }
}
