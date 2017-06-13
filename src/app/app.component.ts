import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isLoggedIn: boolean;
  public userName: string;
  public userEmail: string;

  constructor(public storage: StorageService, private router: Router) {
    this.storage.isLogged.subscribe(
      (auth) => {
        console.log(auth);
        if (auth == false) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.storage.clearLocal();
          this.userName = '';
          this.userEmail = '';
          this.router.navigate(['login']);
        } else {
          console.log("Successfully Logged in.");
          this.isLoggedIn = true;
          this.userName = this.storage.userName;
          this.userEmail = this.storage.userEmail;
          this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.storage.isLogged.next(false);
  }
}
