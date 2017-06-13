import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
    // Retrieve posts from the API
    // this.storageService.getAllPosts().subscribe(posts => {
    //   this.posts = posts;
    // });
  }

  login() {
    // firebase.auth.
    let email = '95mg@wp.pl';
    let password = 'Abcdef123---';
    var cred = firebase.auth.EmailAuthProvider.credential(
      '95mg@wp.pl',
      'Abcdef123---'
    );
    console.log(cred);

    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     console.log(error);
    //   });
    // firebase.auth().signInWithPopup();
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     console.log(error);
    //   });

    // this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
