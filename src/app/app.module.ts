import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { StorageService } from './storage.service';
import { FirebaseService } from './firebase.service';
import { LibraryService } from './library.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomePageComponent } from './home-page/home-page.component';
import { SearcherComponent } from './searcher/searcher.component';
import { LibraryPageComponent } from './library-page/library-page.component';

export const firebaseConfig = {
  apiKey: "AIzaSyA66R4ZKUKgB-k1SvbfZU51T5yLW-4FeLQ",
  authDomain: "homelibrary-d9d99.firebaseapp.com",
  databaseURL: "https://homelibrary-d9d99.firebaseio.com",
  projectId: "homelibrary-d9d99",
  storageBucket: "homelibrary-d9d99.appspot.com",
  messagingSenderId: "145900807908"
};

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'library/:id', component: LibraryPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    SearcherComponent,
    LibraryPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot(routes)
  ],
  providers: [StorageService, FirebaseService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
